"use client"
import React from 'react'
import { Collapse, type CollapseProps, Popconfirm, message } from 'antd'

import { CaretRightOutlined } from '@ant-design/icons'
import { Trash2 } from 'lucide-react'
import { EventProduct } from '@/types/event'
import { Product } from '@/types/product'
import { EventFinancialInfo } from './components/calendar/sections/EventFinancialInfo'
import { EventFinancialResults } from './components/calendar/sections/EventFinancialResults'

interface ProductAccordionViewProps {
    products: Product[]
    eventProducts: EventProduct[]
    onDeleteProduct?: (productId: string) => Promise<void>
    canDelete?: boolean
}

export const ProductAccordionView: React.FC<ProductAccordionViewProps> = ({
    products,
    eventProducts,
    onDeleteProduct,
    canDelete = true
}) => {
    const handleDeleteProduct = async (productId: string) => {
        try {
            if (onDeleteProduct) {
                await onDeleteProduct(productId)
                message.success('Product deleted successfully')
            }
        } catch (error) {
            message.error('Failed to delete product')
        }
    }

    const items: CollapseProps['items'] = products.map(product => {
        const eventProduct = eventProducts.find(ep => ep.productId === product.id)
        if (!eventProduct) return null

        return {
            key: product.id,
            label: (
                <div className="flex justify-between items-center w-full pr-4">
                    <span>{product.name}</span>
                    {canDelete && onDeleteProduct && (
                        <Popconfirm
                            title="Delete Product"
                            description="Are you sure you want to remove this product from the event?"
                            onConfirm={(e) => {
                                e?.stopPropagation()
                                handleDeleteProduct(product.id)
                            }}
                            onCancel={(e) => e?.stopPropagation()}
                            okText="Yes"
                            cancelText="No"
                        >
                            <button
                                className="flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <Trash2 size={16} />
                            </button>
                        </Popconfirm>
                    )}
                </div>
            ),
            children: (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <EventFinancialInfo
                        product={product}
                        financialData={eventProduct.financialData}
                    />
                    <EventFinancialResults
                        financialData={eventProduct.financialData}
                    />
                </div>
            )
        }
    }).filter(Boolean) as CollapseProps['items']

    return (
        <Collapse
            items={items}
            expandIcon={({ isActive }) => (
                <CaretRightOutlined rotate={isActive ? 90 : 0} />
            )}
        />
    )
}