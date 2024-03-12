import { NavLink } from 'react-router-dom';
import '../styles/navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDropdown } from '../../../redux/features/dropdownSlice';
import navigationLinks from '../../../utlis/navigationLinks';
import { useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useGetAllCategoriesQuery } from '../../../redux/features/postsApi';

const Navigation = ({ is_mobile, setMobileMenuOpen }: any) => {
    const dispatch = useDispatch();
    const openDropdownIndex = useSelector((state:any) => state.dropdown.openDropdownIndex);
    const { data, isLoading, isError, error } = useGetAllCategoriesQuery({});
    const categories = data?.data;

    const handleToggleDropdown = (index:any) => {
        dispatch(toggleDropdown(index));
    };

    const dropdownRef = useRef(null);

    useOutsideClick(dropdownRef, () => {
        if (openDropdownIndex !== null) {
            dispatch(toggleDropdown(null));
        }
    });

    const handleCloseDrawer = () => {
        setMobileMenuOpen(false);
    };

    return (
        <nav className={`nav ${is_mobile ? "nav-mobile" : "nav"}`}>
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
                } else if (link.type === 'dropdown' && link.label === 'Categories') {
                    return (
                        <div key={index} className="dropdown-container" ref={dropdownRef}>
                            <span onClick={() => handleToggleDropdown(index)} className="dropdown-label">
                                {link.label}
                            </span>
                            <div className={`dropdown-menu ${openDropdownIndex === index ? 'show' : ''}`}>
                                {categories && categories.map((category, dropdownIndex) => (
                                    <NavLink key={dropdownIndex} to={`/category/${category.id}`} className="nav-link">
                                        {category.name}
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
