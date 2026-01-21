import {SxProps} from '@mui/material'

export const containerSx: SxProps = {
  display: 'flex',
  justifyContent: 'space-between',
}

export const getListItemSx = (isDone: boolean): SxProps => ({
  fontWeight: isDone ? 'normal' : 'bold',
  opacity: isDone ? 0.5 : 1,
})