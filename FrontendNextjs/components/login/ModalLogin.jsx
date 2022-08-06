import Modal from 'react-modal';
import ShowLogin from './ShowLogin';


export { ModalLogin }
function ModalLogin({ show, exit }) {


  return (
    <div>
      <Modal
        isOpen={show}
        contentLabel="onRequestClose Example"
        onRequestClose={exit}
        ariaHideApp={false}
        className="dialog-input open aside"
        overlayClassName="Overlay"
      >
        <div className='container-modal page-login open '>





          <ShowLogin />




        </div>

      </Modal>
    </div>
  );

}