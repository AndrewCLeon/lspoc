import React, { useId } from 'react';
import M from 'materialize-css';
import { TextInput } from '../input/text/TextInput';

type ModalContainerProps = {
  title?: string;
};

export const ModalContainer: React.FC = () => {
  const modalRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    M.Modal.init(modalRef.current!);
  }, []);

  const modalId = useId();

  const adventureNameInputRef = React.useRef<HTMLInputElement>(null);
  const validateAdventureName = (): [boolean?, string?] => {
    const value = adventureNameInputRef.current?.value;
    if (!value) return [];
    if (value.length < 4) return [false, 'Adventure Name must be at least 4 characters'];
    return [true, ''];
  };

  const characterNameInputRef = React.useRef<HTMLInputElement>(null);
  const validateCharacterName = (): [boolean?, string?] => {
    const value = characterNameInputRef.current?.value;
    if (!value) return [];
    if (value.length < 4) return [false, 'Character Name must be at least 4 characters'];
    return [true, ''];
  };

  return (
    <>
      <a href={`#${modalId}`} className="waves-effect waves-light btn modal-trigger">
        Modal
      </a>

      <div ref={modalRef} id={modalId} className="modal">
        <div className="modal-content center-align">
          <div className="row">
            <div className="col s6 offset-s3">
              <h4>New Adventure</h4>
            </div>
          </div>
          <div className="row">
            <TextInput
              ref={adventureNameInputRef}
              label="Adventure Name"
              onChange={console.log}
              validate={validateAdventureName}
            />
          </div>
          <div className="row">
            <TextInput
              ref={characterNameInputRef}
              label="Character Name"
              onChange={console.log}
              validate={validateCharacterName}
            />
          </div>
        </div>
        <div className="modal-footer center-align">
          <a href="#!" className="modal-close btn-flat">
            Cancel
          </a>
          <a href="#!" className="modal-close btn">
            Ok
          </a>
        </div>
      </div>
    </>
  );
};
