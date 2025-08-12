import {
    startOfYear,
    endOfYear,
    eachWeekOfInterval,
    startOfWeek,
    endOfWeek,
    format,
    eachDayOfInterval,
    getMonth,
    getWeek,
    addWeeks,
    subWeeks,
    isValid,
    getDay,
    addDays,
} from 'date-fns'

export const getYearCalendarData = (year: number) => {
    const yearStart = startOfYear(new Date(year, 0, 1))
    const firstMonday = startOfWeek(yearStart, { weekStartsOn: 1 })
    const calendarStart = firstMonday
    const yearEnd = endOfYear(yearStart)
    const lastSunday = endOfWeek(yearEnd, { weekStartsOn: 1 })

    const weeks = eachWeekOfInterval(
        { start: calendarStart, end: lastSunday },
        { weekStartsOn: 1 }
    )

    return weeks.map((week, index) => ({
        weekNumber: getWeek(week, { weekStartsOn: 1, firstWeekContainsDate: 4 }),
        startDate: startOfWeek(week, { weekStartsOn: 1 }),
        endDate: endOfWeek(week, { weekStartsOn: 1 }),
        month: getMonth(week),
        days: eachDayOfInterval({
            start: startOfWeek(week, { weekStartsOn: 1 }),
            end: endOfWeek(week, { weekStartsOn: 1 }),
        }),
    }))
}

export const ensureDate = (date: Date | undefined): Date => {
    return date ? new Date(date) : new Date()
}

/**
 * Adds a specified number of weeks to a date, preserving the exact day of the week.
 * This ensures events maintain their correct day position when dragged.
 */
export const addWeeksToDate = (date: Date | undefined, weeks: number): Date => {
    const baseDate = ensureDate(date)

    // Get the original day of the week (0-6, where 0 is Sunday)
    const dayOfWeek = getDay(baseDate)

    // Get the day of the month
    const dayOfMonth = baseDate.getDate()

    // Create the new date by adding exact weeks (7 * weeks days)
    const newDate = addWeeks(baseDate, weeks)

    // Ensure the day of week is maintained
    const newDayOfWeek = getDay(newDate)
    if (dayOfWeek !== newDayOfWeek) {
        // Adjust the date to match the original day of week
        const diff = dayOfWeek - newDayOfWeek
        return addDays(newDate, diff)
    }

    return newDate
}

/**
 * Safely converts any date type (Date or dayjs) to a standard JavaScript Date
 */
export const toJsDate = (date: any): Date | undefined => {
    try {
        if (!date) return undefined;

        // If it's already a Date object, simply return it
        if (date instanceof Date) {
            // Verify that it's a valid date
            return isValid(date) ? date : undefined;
        }

        // Check if it's a dayjs object by looking for toDate method
        if (date && typeof date.toDate === 'function') {
            const dayjsDate = date.toDate();
            return isValid(dayjsDate) ? dayjsDate : undefined;
        }

        // For moment.js objects
        if (date && typeof date._isAMomentObject === 'boolean' && typeof date.toDate === 'function') {
            const momentDate = date.toDate();
            return isValid(momentDate) ? momentDate : undefined;
        }

        // Handle string/number dates
        if (typeof date === 'string' || typeof date === 'number') {
            const parsedDate = new Date(date);
            return isValid(parsedDate) ? parsedDate : undefined;
        }

        // Last resort: try to create a date from the value
        const fallbackDate = new Date(date);
        return isValid(fallbackDate) ? fallbackDate : undefined;
    } catch (error) {
        console.error('Error converting date:', error);
        return undefined;
    }
};