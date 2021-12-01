import React, { useState } from "react";
import {
    DropdownListClassName, DropdownHeaderButtonClassName, DropdownUlClassName,
    DropdownLiItemClassName, DropdwonCurrentSelectionClassName
} from '../lib/general'
import PropTypes from 'prop-types';

function CustomDropdownList({header,currentIndex,items,onChangeIndex}){
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className={DropdownListClassName}>
            <CustomDropdwownHeader onShow={() => setIsOpen(!isOpen)} header={header}> </CustomDropdwownHeader>
            {isOpen && (<DropdownList onShow={()=> setIsOpen(!isOpen)} onChangeIndex={(index)=> onChangeIndex(index)} items={items}
                >
            </DropdownList>)}
            <h5 className={DropdwonCurrentSelectionClassName}>{items[currentIndex].value}</h5>
        </div>

    );
}

function CustomDropdwownHeader({onShow,header}) {
    return (
        <button className={DropdownHeaderButtonClassName} type="button" onClick={() => onShow()}>{header}</button>
    );

}

function DropdownList({onShow,onChangeIndex,items}) {
    return (
        <ul className={DropdownUlClassName}>
            {items.map((item, index) => (
                <li className={DropdownLiItemClassName} key={index} onClick={()=> {onShow();onChangeIndex(index)}}>
                    {item.value}
                </li>
            ))}
        </ul>
    );
}


CustomDropdownList.propType = {
    header : PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    currentIndex: PropTypes.number.isRequired,
    onChangeIndex: PropTypes.func.isRequired
}

DropdownList.prototype={
    onShow: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    onChangeIndex: PropTypes.func.isRequired
}

CustomDropdwownHeader.prototype = {
    header: PropTypes.string.isRequired,
    onShow: PropTypes.func.isRequired
}

export default CustomDropdownList;