import { nanoid } from 'nanoid';
import css from './Filter.module.css';
import PropTypes from 'prop-types';

export const Filter = props => {
  const filterInputId = nanoid();
  const { onChangeHandle } = props;

  return (
    <div className={css.filter}>
      <label className={css.filterLabel} htmlFor={filterInputId}>
        Find contact by name
      </label>
      <input
        className={css.filterInput}
        type="text"
        name="filter"
        id={filterInputId}
        onChange={onChangeHandle}
      />
    </div>
  );
};

Filter.propTypes = {
  onChangeHandle: PropTypes.func.isRequired,
};
