'use client'

import React, { useEffect, useState } from 'react'
import { Input, Select, DatePicker, ColorPicker, Form } from 'antd'
import dayjs from 'dayjs'
import { eventService } from '@/services/eventServices/eventServices'

const { TextArea } = Input
const { RangePicker } = DatePicker

interface EventDetailsProps {
  formData: any
  setFormData: (data: any) => void
  channels: any[]
  planned: any[]
  actual: any[]
  products: string[]
  getProductsForBrand: (retailerId: string, brandId: string) => string[]
  tpoData: any
}

const EventDetails: React.FC<EventDetailsProps> = ({ formData, setFormData, channels, planned, actual, products, getProductsForBrand, tpoData }) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  useEffect(() => {
    if (formData.planned && formData.planned.length > 0) {
      const productIds = formData.planned.map((p: any) => p.productName)
      setSelectedProducts(productIds)
    }
  }, [formData.planned])

  const handleProductsChange = async (values: string[]) => {
    setSelectedProducts(values)
    if (values.length < selectedProducts.length) {
      const removedProducts = selectedProducts.filter(p => !values.includes(p))
      setFormData({
        ...formData,
        planned: formData.planned.filter((p: any) => !removedProducts.includes(p.productName)),
        actual: formData.actual.filter((p: any) => !removedProducts.includes(p.productName))
      })
      if (values.every(v => selectedProducts.includes(v))) return
    }

    const newProductsToAdd = values.filter(v => !selectedProducts.includes(v))
    if (newProductsToAdd.length === 0) return

    const dataResponse = await eventService.fetchProductData(
      newProductsToAdd,
      tpoData?.project_id,
      tpoData?.model_id,
      tpoData?.retailer_id
    )
    const data: any[] = Array.isArray(dataResponse) ? dataResponse : []
    const existingPlanned = new Set(formData.planned.map((p: any) => p.productId))
    const existingActual = new Set(formData.actual.map((p: any) => p.productId))

    const newPlanned = data
      .filter((p: any) => !existingPlanned.has(p.id))
      .map((p: any) => ({
        productId: p.id,
        productName: p.name,
        financialData: {
          basePrice: p.basePrice,
          basePriceElasticity: p.basePriceElasticity,
          originalBasePrice: p.basePrice,
          originalTotalUnits: p.totalUnits,
          promoPrice: p.promoPrice,
          discount: p.discount,
          units: p.totalUnits,
          totalUnits: p.totalUnits,
          tprDist: p.tprDist,
          doDist: p.doDist,
          foDist: p.foDist,
          fdDist: p.fdDist,
          listPrice: p.listPrice,
          spoils: p.spoils || 0,
          cogs: p.cogs || 0,
          edlpPerUnitRate: p.edlpPerUnitRate,
          promoPerUnitRate: p.promoPerUnitRate,
          vcm: p.vcm,
          fixedFee: p.fixedFee,
          increamentalUnits: p.increamentalUnits,
          promoPriceElasticity: p.promoPriceElasticity,
          featureEffect: p.featureEffect,
          displayEffect: p.displayEffect,
          featureAndDisplayEffect: p.featureAndDisplayEffect
        }
      }))

    const newActual = data
      .filter((p: any) => !existingActual.has(p.id))
      .map((p: any) => ({
        productId: p.id,
        productName: p.name,
        financialData: {
          basePrice: p.basePrice,
          basePriceElasticity: p.basePriceElasticity,
          originalBasePrice: p.basePrice,
          originalTotalUnits: p.totalUnits,
          promoPrice: p.promoPrice,
          discount: p.discount,
          units: p.totalUnits,
          totalUnits: p.totalUnits,
          tprDist: p.tprDist,
          doDist: p.doDist,
          foDist: p.foDist,
          fdDist: p.fdDist,
          listPrice: p.listPrice,
          spoils: p.spoils || 0,
          cogs: p.cogs || 0,
          edlpPerUnitRate: p.edlpPerUnitRate,
          promoPerUnitRate: p.promoPerUnitRate,
          vcm: p.vcm,
          fixedFee: p.fixedFee,
          increamentalUnits: p.increamentalUnits,
          promoPriceElasticity: p.promoPriceElasticity,
          featureEffect: p.featureEffect,
          displayEffect: p.displayEffect,
          featureAndDisplayEffect: p.featureAndDisplayEffect
        }
      }))

    setFormData({
      ...formData,
      planned: [...formData.planned, ...newPlanned],
      actual: [...formData.actual, ...newActual]
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Event Details</h3>
        <div className="space-y-4">
          <Form.Item label="Title" required>
            <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="Enter event title" />
          </Form.Item>

          <Form.Item label="Description">
            <TextArea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Enter event description" rows={4} />
          </Form.Item>

          <div className="col-span-2">
            <Form.Item label="Date Range" required>
              <RangePicker
                className="w-full"
                value={[formData.start_date ? dayjs(formData.start_date) : null, formData.end_date ? dayjs(formData.end_date) : null] as any}
                onChange={(dates: any) => {
                  if (dates) {
                    setFormData({
                      ...formData,
                      start_date: dates[0] ? dates[0].toDate() : undefined,
                      end_date: dates[1] ? dates[1].toDate() : undefined,
                    })
                  }
                }}
              />
            </Form.Item>
          </div>

          <Form.Item label="Color">
            <ColorPicker value={formData.color} onChange={(color) => setFormData({ ...formData, color: (color as any).toHexString() })} />
          </Form.Item>

          <Form.Item label="Status">
            <Select
              value={formData.status}
              onChange={(value) => setFormData({ ...formData, status: value })}
              className="w-full"
              options={[
                { label: 'Draft', value: 'DRAFT' },
                { label: 'Active', value: 'ACTIVE' },
                { label: 'Completed', value: 'COMPLETED' },
              ]}
            />
          </Form.Item>

          <Form.Item label="Channels">
            <Select
              mode="multiple"
              value={formData.channels}
              onChange={(values) => setFormData({ ...formData, channels: values })}
              className="w-full"
              placeholder="Select channels"
              options={channels.map((channel: any) => ({ label: channel.name, value: channel.id }))}
            />
          </Form.Item>

          <Form.Item label="PPG Name">
            <Input value={formData.ppg_name} onChange={(e) => setFormData({ ...formData, ppg_name: e.target.value })} placeholder="Enter PPG name" />
          </Form.Item>

          <Form.Item label="Products" required>
            <Select
              mode="multiple"
              value={selectedProducts}
              onChange={handleProductsChange}
              className="w-full"
              placeholder="Select products"
              options={products.map((product: string) => ({ label: product, value: product }))}
            />
          </Form.Item>
        </div>
      </div>
    </div>
  )
}

export default EventDetails


