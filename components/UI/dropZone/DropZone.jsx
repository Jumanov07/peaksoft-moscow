import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import DropImg from '../../../public/adminIcons/plus.svg'
import classes from './DropZone.module.css'

export function DropZone({ avatar, setAvatar }) {
   const { getRootProps, getInputProps } = useDropzone({
      acceptedFiles: '.jpeg,.jpg,.png,.gif',
      multiple: false,
      onDrop: (files) => {
         setAvatar({
            avatar: files[0],
            preview: URL.createObjectURL(files[0]),
         })
      },
   })

   return (
      <div className={classes.dropZoneBox}>
         <span {...getRootProps()} className={classes.uploadedBook}>
            <input
               type="file"
               accept="image/png, image/gif, image/jpeg"
               {...getInputProps()}
            />
            {!avatar ? (
               <div className={classes.dromImgBox}>
                  <span className={classes.plusicon}>
                     <Image src={DropImg} alt="icon" />
                  </span>
                  <span className={classes.span}>
                     Нажмите на иконку чтобы загрузить или перетащите фото
                  </span>
               </div>
            ) : (
               <>
                  <Image
                     src={avatar?.preview}
                     alt="image"
                     width={220}
                     height={155}
                     layout="fixed"
                  />
                  <button
                     type="button"
                     className={classes.changeBtn}
                     {...getInputProps}
                  >
                     Заменить
                  </button>
               </>
            )}
         </span>
      </div>
   )
}
