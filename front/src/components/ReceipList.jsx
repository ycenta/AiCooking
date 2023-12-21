import Receip from './Receip';

export default function ReceipList(props) {
  return (
    <div className="receipList">
         
          {props.receips.map((receip, index) => {
            return <Receip key={index}
            title={receip.name} calories={receip.calories} ingredients={receip.ingredients}
            onGenerateList={props.onGenerateList}
            />
          })}

    </div>
  );}

