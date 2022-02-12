import style from '../styles/AddButton.module.css';

const AddButton = ({setClose}) => {
  return <div onClick={()=> setClose(false)} className={style.mainAddButton}>
    Add New Pizza
  </div>;
};

export default AddButton;
