function BaseSelectForm(props) {

  return ( 
    <div className="select is-rounded">
      <select
        onChange={(e) => props.onChange(e.target.value)}
      >
        { props.options.map(
          (item) => {
            return (<option key={item.id} value={item.value}>{item.text}</option>)
          }
        )}
      </select>
    </div>
  );
}

export default BaseSelectForm;