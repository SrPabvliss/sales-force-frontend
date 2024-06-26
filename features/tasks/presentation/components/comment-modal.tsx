import Image from 'next/image'

import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import NoComments from '../../../../public/no-comments.png'
import { IComment } from '../../models/ITask'

interface CommentsModalProps {
  isOpen: boolean
  onClose: () => void
  taskId: number
  comments: IComment[]
  onAddComment: (taskId: number, comment: string) => void
}

const CommentsModal: React.FC<CommentsModalProps> = ({ taskId, isOpen, onClose, comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('')

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(taskId, newComment)
      setNewComment('')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Comentarios</DialogTitle>
          <DialogDescription>Agrega y visualiza comentarios de la tarea seleccionada.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid items-center gap-4">
            <Label htmlFor="new-comment" className="text-right">
              Nuevo comentario
            </Label>
            <Input
              id="new-comment"
              placeholder="Escribe un nuevo comentario..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="w-full"
            />
          </div>
          <Button onClick={handleAddComment}>Agregar</Button>
        </div>
        <ScrollArea className="h-72 px-4">
          {comments.length === 0 ? (
            <Card className="flex h-full flex-col items-center justify-center">
              <Image src={NoComments.src} alt="No Comments" width={250} height={250} />
              <p className=" pb-4 text-center text-sm text-opacity-50">
                Aún no has agregado comentarios. ¡Escribe el primero!
              </p>
            </Card>
          ) : (
            comments.map((comment) => (
              <React.Fragment key={comment.id}>
                <Card className="my-2 flex items-center p-4 pb-0">
                  <CardContent>{comment.content}</CardContent>
                </Card>
                <Separator />
              </React.Fragment>
            ))
          )}
        </ScrollArea>
        <DialogFooter>
          <Button onClick={onClose}>Regresar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CommentsModal
