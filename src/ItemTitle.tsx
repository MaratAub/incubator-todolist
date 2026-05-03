import {EditableSpan} from "./EditableSpan.tsx";
import {useState} from "react";
import {Box, IconButton, SxProps} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

type Props = {
  title: string,
  changeTitle:(title:string) => void,
  deleteItem:() => void,
  sx?: SxProps,
}

export const ItemTitle = ({title,changeTitle, deleteItem, sx}:Props) => {

  const [editMode, setEditMode] = useState<boolean>(false)

  const onEditMode = () => {
    setEditMode(true)
  }
  const offEditMode = () => {
    setEditMode(false)
  }

  const changeTitleHandler = (title:string) => {
    changeTitle(title)
  }

  return (
    editMode
      ?
      <Box sx={sx}>
        <EditableSpan title={title}
                      changeTitle={(title) => changeTitleHandler(title)}
                      editMode={editMode}
                      offEditMode={offEditMode}
        />
      </Box>
      :
      <>
        <Box sx={{display:'flex', width:'100%', justifyContent:'space-between', alignItems: 'center'}}>
          <Box sx={sx}>
            <EditableSpan title={title}
                          changeTitle={(title) => changeTitleHandler(title)}
                          editMode={editMode}
                          offEditMode={offEditMode}
            />
          </Box>
          <Box>
            <IconButton onClick={onEditMode} title={'Редактировать'}>
              <EditIcon/>
            </IconButton>
            <IconButton onClick={deleteItem} title={'Удалить'}>
              <DeleteOutlineIcon/>
            </IconButton>
          </Box>
        </Box>
      </>
  );
};
