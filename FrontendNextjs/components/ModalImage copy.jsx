import Modal from 'react-modal';
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from 'next-i18next'
import { accountService } from '../src/_services';
//import FacebookLogin from 'react-facebook-login';
import AvatarEditor from 'react-avatar-editor'
import getConfig from 'next/config';
import { of } from 'rxjs';


const { publicRuntimeConfig } = getConfig();

//const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const baseUrl = `${publicRuntimeConfig.imgUrl}`;

export { ModalImagex }
function ModalImagex({ show, exit, pathImage, change }) {
  const { t } = useTranslation('common');
  const [scale, setScale] = React.useState('1');
  const [allowZoomOut, setAllowZoomOut] = React.useState(false);

  const myImage = (pathImage) ? pathImage : "default-male.svg"
  const [image, setImage] = React.useState(`${baseUrl}/${myImage}`);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [editor, setEditor] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    // setImage(`${baseUrl}/${myImage}`)
  }, [])

  const setEditorRef = (s) => {


    setEditor(s);
    //if(editor){
    // editor.getImageScaledToCanvas();
    // console.log(editor);
    //  }
  }

  const handleNewImage = (e) => {

    if (e.target.files[0]) {
      const i = e.target.files[0];

      setImage(i)
      setCreateObjectURL(URL.createObjectURL(i));

    }
  }

  const uploadToServer = async (event) => {
    const body = new FormData();
    if (editor) {
      // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
      // drawn on another canvas, or added to the DOM.
      console.log('editor', editor)
      //  editor.props.crossOrigin = 'anonymous'
      //editor.setAttribute('crossOrigin', 'anonymous');

      const canvas = editor.getImageScaledToCanvas().toBlob((blob) => {

        body.append("file", blob, "filename.jpg");

        console.log('blob', blob)
        // data.append("file", blob, "filename.jpg")
        accountService.upload(body).then(result => {
          console.log(result);
          const uSession = localStorage.getItem('user');
          const jsonsesson = JSON.parse(uSession)
          jsonsesson.image = result.image;

          localStorage.setItem('user', JSON.stringify(jsonsesson));

          change(result)
        }).then(t => {
          console.log("exit");


          exit()
        });

        //submit(data)
      }, 'image/jpeg', 0.9);





      // console.log('canvas',canvas)
      // canvas.editor = 'anonymous';
      // canvas.setAttribute('crossOrigin', null);
      //  canvas.crossOrigin = "anonymous"

      // body.append("file", canvas);

      //  accountService.upload(body).then(result=> change(result)).then(exit());
      // If you want the image resized to the canvas size (also a HTMLCanvasElement)
      //const canvasScaled = this.editor.getImageScaledToCanvas()
    }



  };
  const handleScale = (e) => {
    const scaleee = parseFloat(e.target.value)
    setScale(scaleee)
  }

  const handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
    setAllowZoomOut({ allowZoomOut })
  }

  return (
    <div>
      <Modal
        isOpen={show}
        contentLabel="onRequestClose Example"
        onRequestClose={exit}
        ariaHideApp={false}
        className="image-modal dialog-input open aside"
        overlayClassName="Overlay"
      >

        <div className='dialog open'>

          <div className='portrait-actions open '>


            <h2>حدد وعدل موضع صورتك</h2>
            <AvatarEditor
              ref={setEditorRef}
              image={image}
              // crossOrigin='Anonymous'
              // crossOrigin='Anonymous'
              //  crossOrigin={null}
              //crossOrigin="*"
              // crossOrigin='https://localhost:5001/'
              className="editor-canvas"
              width={300}
              height={300}
              border={20}
              rotate={0}
              scale={parseFloat(scale)}
              color={[255, 255, 255, 0.6]} // RGBA

            />
            <br />

            <label htmlFor="files" className="btn-img-upload"><span><div>حمل الصورة</div></span></label>


            <input
              id="files"
              name="newImage"
              type="file"
              className='files'
              onChange={handleNewImage}

            />



            <div className='range'><span>- </span> <input
              name="scale"
              type="range"
              className='precent'
              onChange={handleScale}
              min={(allowZoomOut) ? '0.5' : '1'}
              max="2"
              step="0.01"
              defaultValue="1"
            /> <span> +</span></div>
            <button onClick={uploadToServer} className="save precent"><span>حفظ</span></button>

          </div>
        </div>


      </Modal>
    </div>
  );

}