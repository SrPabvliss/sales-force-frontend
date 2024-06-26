import React from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog'

interface ConfirmDialogProps {
  onConfirm: () => void
  onCancel?: () => void
  title: string
  description: string
  children: React.ReactNode
  isDestructive?: boolean
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  onConfirm,
  onCancel,
  title,
  description,
  children,
  isDestructive = false,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant={isDestructive ? 'destructive' : 'default'} onClick={onConfirm}>
              Continuar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ConfirmDialog
