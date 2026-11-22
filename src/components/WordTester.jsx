import { isWordValid } from "../helpers/testWord";
import { useForm } from "../hooks/useForm";

export const WordTester = (props) => {
  const { dfa } = props;
  const [formValues, handleInputChange] = useForm({
    word: "",
  });
  const { word } = formValues;
  const handleTestWord = () => {
    isWordValid(word, dfa.value);
  };
  return (
    <div>
      <h4>Test a word</h4>
      <div className="row">
        <div className="col-3">
          <div className="input-group ">
            <input
              name="word"
              type="text"
              className="form-control"
              placeholder="Type a word "
              onChange={handleInputChange}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleTestWord}
            >
              Verify
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
