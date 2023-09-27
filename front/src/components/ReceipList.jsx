import Receip from './Receip';

export default function ReceipList(props) {
  return (
    <div className="receipList">
         
          {props.receips.map((receip) => {
            return <Receip title={receip.name} calories={receip.calories} ingredients={receip.ingredients}/>
          })}

    </div>
  );}

