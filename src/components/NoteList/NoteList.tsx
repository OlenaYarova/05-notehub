import css from './noteList.module.css'
import type { Note } from '../../types/note';
 import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast'
import { deleteNote } from '../../services/noteService'
import Loader from '../Loader/Loader'
interface NoteListProps{
    notes: Note[];
}
 
export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const deleteNoteMutation = useMutation({
    mutationFn: deleteNote,

    onMutate: (id: string) => setDeleteId(id),
  
    onSettled: () => {
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
  },
    onSuccess: () => {
      toast.success("Note delete!");
  },
    onError: () => {
      toast.error("Failed to delete. Please try again");
    },
    });

  return (
    <ul className={css.list}>
      {notes.map(({ id, title, content, tag }) => {
        return (
          <li key={id} className={css.listItem}>
            <h2 className={css.title}>Note {title}</h2>
            <p className={css.content}>Note {content}</p>
            <div className={css.footer}>
              <span className={css.tag}>Note {tag}</span>
              <button className={css.button}
                disabled={deleteId === id}
                onClick={() => deleteNoteMutation.mutate(id)}
              >{deleteId === id ? <Loader /> : "Delete"}</button>
            </div>
          </li>);
      })}
    </ul>
  );    
          }
 
   

     