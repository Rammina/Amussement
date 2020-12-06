/*

<React.Fragment>
  <div
    className={`backdrop ${getImageUploadModalClass()} user-avatar`}
    onClick={() => {
      setImageUploadModalOpen(false);
    }}
  ></div>
  <div className={`user-avatar modal ${getImageUploadModalClass()}`}>
    <header className="user-settings-sidebar-header user-avatar">
      <div className="modal-heading-container modal-header-content-container">
        <BackButton
          componentClass="user-avatar"
          hideOnDesktop={true}
          onClickHandler={() => {
            setImageUploadModalOpen(false);
          }}
        />
        <h3 className="user-avatar modal-heading modal-header-heading">
          Upload Avatar
        </h3>
        <CloseButton
          componentClass="user-avatar"
          hideOnMobile={true}
          onClickHandler={() => {
            setImageUploadModalOpen(false);
          }}
        />
      </div>
    </header>
    <div className={`user-avatar modal-content-container`}>
      {previewSource && (
        <img
          id="user-avatar-preview-image"
          src={previewSource}
          alt="Chosen Image"
        />
      )}
      <p className="user-avatar modal-paragraph">{imageUploadName}</p>
      {/*<p className="user-avatar modal-paragraph">
      Would you like to select this image as your avatar?
    </p>
    */}
      <div
        className="two-buttons-container"
        id="user-avatar-buttons-container"
      >
        <button
          id="user-avatar-image-cancel"
          className="user-avatar modal-button"
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setImageUploadModalOpen(false);
          }}
        >
          Cancel
        </button>
        <button
          id="user-avatar-image-submit"
          className="user-avatar modal-button"
          type="submit"
        >
          Submit Image
        </button>
      </div>
    </div>
  </div>{" "}
</React.Fragment>

*/
