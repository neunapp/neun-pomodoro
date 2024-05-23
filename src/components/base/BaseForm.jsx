function BaseForm(props) {
  return ( 
    <div className="field p-2">
      <p className="control has-icons-left has-icons-right">
        <input 
          className="input is-rounded" 
          type={props.tipo} 
          placeholder={props.placeholder}
          value={props.value}
          maxLength={props.maxLength}
          onChange={(e) => props.onChange(e.target.value)}
        />
        <span className="icon is-small is-left">
          {props.icon}
        </span>
      </p>
    </div>
  );
}

export default BaseForm;