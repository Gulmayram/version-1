import React, {useEffect, useState} from 'react';
import './CustomSelect.css';
import ResetIcon from "../../assets/reset.svg"
const CustomSelect = ({ options, defaultTitle, onSelect }) => {
    const [isActive, setIsActive] = useState(false);
    const [selectedValue, setSelectedValue] = useState(defaultTitle);
    const [isSpinning, setIsSpinning] = useState(false);
    const handleTitleClick = () => {
        setIsActive(!isActive);
    };

    const handleOptionClick = (value) => {
        setSelectedValue(value === '' ? 'Все' : value.title_ru);
        setIsActive(false);
        if (onSelect) onSelect(value.id);
    };

    const handleResetClick = () => {
        setSelectedValue(defaultTitle);
        handleOptionClick('')
        setIsActive(false);
        setIsSpinning(true)
        setTimeout(() => {
            setIsSpinning(false);
        }, 2000); // Иконка будет крутиться 2 секунды
    };
    return (
        <div className='select'>
            <h3 htmlFor="categories" style={{marginRight: '5px'}}>Категория:</h3>
            <div className={`__select ${isActive ? 'active' : ''}`}>
                <div className="__select__title" onClick={handleTitleClick}>
                    {selectedValue}
                </div>
                {isActive && (
                    <div className="__select__content">
                        {options?.map((option) => (
                            <div
                                key={option.id}
                                className="__select__label"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.title_ru}
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {selectedValue === 'Все' ? <></>: (
                <div className={`resetBtn`} onClick={handleResetClick}>
                    <img src={ResetIcon} alt=""/>
                </div>
            )}
        </div>
    );
};

export default CustomSelect;
