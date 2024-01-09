import Receip from './Receip';

export default function ReceipList(props) {
  return (
    <div className="receipList">
         
          {props.receips.map((receip, index) => {
            return <Receip key={index}
            title={receip.title} calories={receip.calories} ingredients={receip.ingredients} id={receip.id}
            onGenerateList={props.onGenerateList}
            />
          })}

    </div>
  );}

