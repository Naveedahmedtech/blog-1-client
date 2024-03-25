import { Link, NavLink } from 'react-router-dom';
import '../styles/navigation.css';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDropdown } from '../../../redux/features/dropdownSlice';
import navigationLinks from '../../../utils/navigationLinks';
import { useRef } from 'react';
import useOutsideClick from '../../../hooks/useOutsideClick';
import { useGetAllCategoriesQuery } from '../../../redux/features/postsApi';
import ProfileMenu from './ProfileMenu';
import { useAuth } from '../../../hooks/useAuth';
import { Button } from '@mui/material';

const Navigation = ({ is_mobile, setMobileMenuOpen }: any) => {
    const { userData } = useAuth();
    const dispatch = useDispatch();
    const openDropdownIndex = useSelector((state: any) => state.dropdown.openDropdownIndex);
    const { data, isLoading, isError, error } = useGetAllCategoriesQuery({});
    const categories = data?.data;

    // New handlers for mouse enter and leave
    const handleMouseEnter = (index: any) => {
        dispatch(toggleDropdown(index));
    };

    const handleMouseLeave = () => {
        dispatch(toggleDropdown(null));
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
                        <div key={index} className="dropdown-container" ref={dropdownRef}
                            aria-haspopup="true"
                            aria-expanded={openDropdownIndex === index ? "true" : "false"}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <span className="dropdown-label" tabIndex={0} role="button">
                                {link.label}
                            </span>
                            <div className={`dropdown-menu ${openDropdownIndex === index ? 'show' : ''}`} role="menu">
                                {isLoading ? (
                                    <div>Loading...</div>
                                ) : isError ? (
                                    <div>Error loading categories</div>
                                ) : (
                                    categories && categories.map((category: any, dropdownIndex) => (
                                        <NavLink key={dropdownIndex} to={`/category/${category._id}?category_name=${category.name}`} className="nav-link" role="menuitem">
                                            {category.name}
                                        </NavLink>
                                    ))
                                )}
                            </div>
                        </div>
                    );
                }
            })}
            <div className="">
                {userData ? (
                    <ProfileMenu />
                ) : (
                    <div>
                        <Button variant='outlined' sx={{ margin: "0 20px 0 0" }} component={Link} to="/login">Login</Button>
                        <Button variant='contained' component={Link} to="/register">Register</Button>
                    </div>
                )}
            </div>
        </nav >
    );
};


export default Navigation;
