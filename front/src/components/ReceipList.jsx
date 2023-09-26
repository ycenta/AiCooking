export default function ReceipList(props) {
    return (
    <div className="receipList">
       props.receips.map((receip, i) => {
                  return <Receip key={i} title={receip.title} calories={receip.calories}/>
         })
    </div>
    )
  }