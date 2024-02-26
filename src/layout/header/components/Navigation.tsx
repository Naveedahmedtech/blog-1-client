import { NavLink } from 'react-router-dom';
import '../styles/navigation.css'; // Make sure the path is correct
// import { RootState } from '../../../redux/store'; // Ensure correct path
import { useDispatch, useSelector } from 'react-redux';
import { toggleDropdown } from '../../../redux/features/dropdownSlice'; // Ensure correct path
import navigationLinks from '../../../utlis/navigationLinks';
import { useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';


const Navigation = ({ is_mobile, setMobileMenuOpen } :any ) => {
    const dispatch = useDispatch();
    const openDropdownIndex = useSelector((state: any) => state.dropdown.openDropdownIndex);
    const handleToggleDropdown = (index: number) => {
        dispatch(toggleDropdown(index));
    };

    

    const dropdownRef = useRef(null); 

    useOutsideClick(dropdownRef, () => {
        if (openDropdownIndex !== null) {
            dispatch(toggleDropdown(null)); 
        }
    });

    // Example function in parent component
    const handleCloseDrawer = () => {
        setMobileMenuOpen(false); 
    };



    return (
        <nav className={`nav ${is_mobile ? "nav-mobile" : "nav" }`}>
            {navigationLinks.map((link, index) => {
                if (link.type === 'link') {
                    return (
                        <NavLink key={index}
                            to={link.to}
                            className="nav-link"
                            onClick={handleCloseDrawer}
                        >
                            {link.label}
                        </NavLink>
                    );
                } else if (link.type === 'dropdown') {
                    return (
                        <div key={index} className="dropdown-container" ref={dropdownRef}>
                            <span onClick={() => handleToggleDropdown(index)} className="dropdown-label">
                                {link.label}
                            </span>
                            <div className={`dropdown-menu ${openDropdownIndex === index ? 'show' : ''}`}>
                                {link.items.map((dropdownLink, dropdownIndex) => (
                                    <NavLink key={dropdownIndex} to={dropdownLink.to} className="nav-link">
                                        {dropdownLink.label}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    );
                }
            })}
        </nav>
    );
};

export default Navigation;
