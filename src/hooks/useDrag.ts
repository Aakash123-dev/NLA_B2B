import { useState, useRef, useCallback } from 'react';

interface UseDragProps {
    onDragEnd: (weeksDelta: number) => void;
    elementRef: React.RefObject<HTMLDivElement>;
    backgroundColor: string;
}

export const useDrag = ({ onDragEnd, elementRef, backgroundColor }: UseDragProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const [weeksDelta, setWeeksDelta] = useState(0);
    const startXRef = useRef<number>(0);
    const currentXRef = useRef<number>(0);
    const ghostRef = useRef<HTMLDivElement | null>(null);
    const lastWeeksDelta = useRef<number>(0);
    const isDraggingRef = useRef<boolean>(false);

    const getCellWidth = () => {
        // Get the table element
        const table = document.querySelector('.tpo-calendar');
        if (!table) return 40; // Fallback width
        
        // Get the total width of the table
        const tableWidth = table.clientWidth - 120; // Subtract left header column width
        
        // Get number of days displayed
        const headerCells = document.querySelectorAll('.tpo-calendar thead th');
        const numberOfDays = headerCells.length * 7; // Each column is a week (7 days)
        
        // Calculate day width
        const dayWidth = tableWidth / numberOfDays;
        return dayWidth;
    };
    
    const getCellsPerWeek = () => {
        return 7; // Calendar displays 7 days per week
    };

    const createGhost = (element: HTMLDivElement) => {
        const ghost = element.cloneNode(true) as HTMLDivElement;
        ghost.style.position = 'fixed';
        ghost.style.pointerEvents = 'none';
        ghost.style.opacity = '0.8';
        ghost.style.backgroundColor = backgroundColor;
        ghost.style.width = `${element.offsetWidth}px`;
        ghost.style.height = `${element.offsetHeight}px`;
        ghost.style.zIndex = '1000';
        ghost.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
        ghost.style.transition = 'transform 0.05s ease-out, opacity 0.2s ease';
        ghost.style.borderRadius = '6px';
        ghost.classList.add('event-drag-ghost'); // Add class for easier identification

        // Ensure text is visible in ghost element
        const textElements = ghost.querySelectorAll('span');
        textElements.forEach(span => {
            span.style.color = 'white';
            span.style.fontWeight = '600';
        });

        document.body.appendChild(ghost);
        return ghost;
    };

    const updateGhostPosition = (ghost: HTMLDivElement, element: HTMLDivElement, deltaX: number, snapping: boolean = false) => {
        const rect = element.getBoundingClientRect();
        ghost.style.top = `${rect.top}px`;
        ghost.style.left = `${rect.left}px`;

        // Apply transform with snapping effect
        if (snapping) {
            // Use a stronger easing for snapping
            ghost.style.transition = 'transform 0.15s cubic-bezier(0.34, 1.56, 0.64, 1)';
        } else {
            ghost.style.transition = 'transform 0.05s ease-out';
        }

        // Apply transform and ensure it's a pixel value
        ghost.style.transform = `translateX(${Math.round(deltaX)}px)`;
    };

    // Helper function to start drag
    const startDrag = (clientX: number, element: HTMLDivElement) => {
        setIsDragging(true);
        isDraggingRef.current = true;
        startXRef.current = clientX;
        currentXRef.current = clientX;
        lastWeeksDelta.current = 0;

        // Add a class to the body for global drag state
        document.body.classList.add('is-dragging');

        // Create ghost element
        if (!ghostRef.current) {
            ghostRef.current = createGhost(element);
            if (ghostRef.current) {
                updateGhostPosition(ghostRef.current, element, 0);
            }
        }
    };

    // Mouse event handlers
    const handleDragStart = useCallback((e: React.MouseEvent) => {
        if (!elementRef.current) return;
        e.preventDefault();
        e.stopPropagation();

        const element = elementRef.current;
        startDrag(e.clientX, element);

        const dayWidth = getCellWidth();
        const daysPerWeek = getCellsPerWeek();

        // Mouse event handler
        const handleDragMove = (e: MouseEvent) => {
            if (!isDraggingRef.current || !element || !ghostRef.current) return;

            e.preventDefault();

            const deltaX = e.clientX - startXRef.current;
            // Calculate week delta based on day movement
            const daysDelta = Math.round(deltaX / dayWidth);
            const newWeeksDelta = Math.floor(daysDelta / daysPerWeek);

            // Update ghost position
            updateGhostPosition(ghostRef.current, element, deltaX, newWeeksDelta !== lastWeeksDelta.current);
            currentXRef.current = e.clientX;

            // Update weeks delta for snapping feedback
            if (newWeeksDelta !== weeksDelta) {
                setWeeksDelta(newWeeksDelta);
                lastWeeksDelta.current = newWeeksDelta;

                // Provide visual feedback when snapping to a new week
                if (ghostRef.current) {
                    ghostRef.current.style.opacity = '0.9';
                    ghostRef.current.style.animation = 'pulse 0.5s ease-out';

                    setTimeout(() => {
                        if (ghostRef.current) {
                            ghostRef.current.style.opacity = '0.8';
                            ghostRef.current.style.animation = 'none';
                        }
                    }, 300);
                }
            }
        };

        // Common cleanup function
        const cleanup = () => {
            document.body.classList.remove('is-dragging');
            setIsDragging(false);
            isDraggingRef.current = false;
            setWeeksDelta(0);

            document.removeEventListener('mousemove', handleDragMove);
            document.removeEventListener('mouseup', handleDragEnd);
        };

        // Mouse up handler
        const handleDragEnd = (e: MouseEvent) => {
            if (!isDraggingRef.current) return;

            e.preventDefault();

            const deltaX = currentXRef.current - startXRef.current;
            const daysDelta = Math.round(deltaX / dayWidth);
            const finalWeeksDelta = Math.floor(daysDelta / daysPerWeek);

            // Add a final animation to snap to the grid before removing
            if (ghostRef.current && element) {
                // Snap to day grid for final position
                const finalX = daysDelta * dayWidth;
                updateGhostPosition(ghostRef.current, element, finalX, true);

                // Fade out ghost before removing
                ghostRef.current.style.opacity = '0';
                setTimeout(() => {
                    if (ghostRef.current) {
                        ghostRef.current.remove();
                        ghostRef.current = null;
                    }
                }, 150);
            } else if (ghostRef.current) {
                ghostRef.current.remove();
                ghostRef.current = null;
            }

            // Reset weeks delta and notify parent
            if (finalWeeksDelta !== 0) {
                onDragEnd(finalWeeksDelta);
            }

            cleanup();
        };

        // Add event listeners
        document.addEventListener('mousemove', handleDragMove, { passive: false });
        document.addEventListener('mouseup', handleDragEnd);

    }, [elementRef, onDragEnd, weeksDelta, backgroundColor]);

    // Touch event handler
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (!elementRef.current) return;
        e.preventDefault();
        e.stopPropagation();

        const element = elementRef.current;
        const touch = e.touches[0];
        startDrag(touch.clientX, element);

        const dayWidth = getCellWidth();
        const daysPerWeek = getCellsPerWeek();

        // Touch move handler
        const handleTouchMove = (e: TouchEvent) => {
            if (!isDraggingRef.current || !element || !ghostRef.current) return;

            e.preventDefault();

            const touch = e.touches[0];
            const deltaX = touch.clientX - startXRef.current;
            const daysDelta = Math.round(deltaX / dayWidth);
            const newWeeksDelta = Math.floor(daysDelta / daysPerWeek);

            // Update ghost position
            updateGhostPosition(ghostRef.current, element, deltaX, newWeeksDelta !== lastWeeksDelta.current);
            currentXRef.current = touch.clientX;

            // Update weeks delta for snapping feedback
            if (newWeeksDelta !== weeksDelta) {
                setWeeksDelta(newWeeksDelta);
                lastWeeksDelta.current = newWeeksDelta;

                // Provide visual feedback when snapping to a new week
                if (ghostRef.current) {
                    ghostRef.current.style.opacity = '0.9';
                    ghostRef.current.style.animation = 'pulse 0.5s ease-out';

                    setTimeout(() => {
                        if (ghostRef.current) {
                            ghostRef.current.style.opacity = '0.8';
                            ghostRef.current.style.animation = 'none';
                        }
                    }, 300);
                }
            }
        };

        // Touch end cleanup
        const cleanup = () => {
            document.body.classList.remove('is-dragging');
            setIsDragging(false);
            isDraggingRef.current = false;
            setWeeksDelta(0);

            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };

        // Touch end handler
        const handleTouchEnd = (e: TouchEvent) => {
            if (!isDraggingRef.current) return;

            e.preventDefault();

            const deltaX = currentXRef.current - startXRef.current;
            const daysDelta = Math.round(deltaX / dayWidth);
            const finalWeeksDelta = Math.floor(daysDelta / daysPerWeek);

            // Add a final animation to snap to the grid before removing
            if (ghostRef.current && element) {
                // Snap to day grid for final position
                const finalX = daysDelta * dayWidth;
                updateGhostPosition(ghostRef.current, element, finalX, true);

                // Fade out ghost before removing
                ghostRef.current.style.opacity = '0';
                setTimeout(() => {
                    if (ghostRef.current) {
                        ghostRef.current.remove();
                        ghostRef.current = null;
                    }
                }, 150);
            } else if (ghostRef.current) {
                ghostRef.current.remove();
                ghostRef.current = null;
            }

            // Notify parent of the change
            if (finalWeeksDelta !== 0) {
                onDragEnd(finalWeeksDelta);
            }

            cleanup();
        };

        // Add touch event listeners
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

    }, [elementRef, onDragEnd, weeksDelta, backgroundColor]);

    return {
        isDragging,
        weeksDelta,
        dragProps: {
            onMouseDown: handleDragStart,
            onTouchStart: handleTouchStart,
            style: {
                cursor: isDragging ? 'grabbing' : 'grab',
                backgroundColor,
                opacity: isDragging ? 0.3 : 1,
                transition: isDragging ? 'none' : 'opacity 0.2s ease-in-out',
                touchAction: 'none' // Prevent browser touch actions for draggable elements
            },
        },
    };
};