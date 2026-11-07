export default function Modal({ title, children, onClose, onSubmit, error }) {
  return (
    <div className="modal-bg" onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <form className="modal" onSubmit={onSubmit}>
        <h2>{title}</h2>
        {children}
        {error && <div className="error">{error}</div>}
        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>Cancel</button>
          <button className="primary">Save</button>
        </div>
      </form>
    </div>
  );
}
