'use client'

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { CanvasNode } from './types'

interface DeleteNodeDialogProps {
  nodeToDelete: CanvasNode | null
  setNodeToDelete: (node: CanvasNode | null) => void
  handleDeleteConfirm: () => void
}

export default function DeleteNodeDialog({
  nodeToDelete,
  setNodeToDelete,
  handleDeleteConfirm
}: DeleteNodeDialogProps) {
  return (
    <AlertDialog open={!!nodeToDelete} onOpenChange={(open) => !open && setNodeToDelete(null)}>
      <AlertDialogContent className="bg-white border border-slate-200">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-slate-800">Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-slate-600">
            This action cannot be undone. This will permanently delete the "{nodeToDelete?.name}{nodeToDelete && nodeToDelete.version > 0 ? ` v${nodeToDelete.version}` : ''}" node and all its connections.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setNodeToDelete(null)} className="border-slate-300 text-slate-700 hover:bg-slate-50">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 text-white hover:bg-red-700">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
