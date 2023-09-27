export default function Button(props) {
    return (
      <button style={props.style} onClick={props.onClick}>{props.text}</button>
    )
  }