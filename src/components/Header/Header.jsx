import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import { FaSearch, FaBars, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { FiChevronDown } from "react-icons/fi";
import nav_logo from "../../assets/Images/nav_log.png";
import usa_flag from "../../assets/Images/usa_flag.png";

function Header() {
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerState, setHeaderState] = useState("visible"); // 'visible', 'hidden', 'topFixed'
  const headerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const headerHeight = headerRef.current
        ? headerRef.current.offsetHeight
        : 0;

      if (currentScrollY > lastScrollY && currentScrollY > headerHeight) {
        // Scrolling Down and past the header
        if (headerState !== "hidden") setHeaderState("hidden");
      } else if (currentScrollY < lastScrollY && currentScrollY > 0) {
        // Scrolling Up (not at top)
        if (headerState !== "topFixed") setHeaderState("topFixed");
      } else if (currentScrollY === 0) {
        // At the very top
        if (headerState !== "visible") setHeaderState("visible");
      }
      setLastScrollY(currentScrollY <= 0 ? 0 : currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, headerState]);

  const desktopNavLinks = [
    { name: "All", icon: FaBars },
    "Today's Deals",
    "Customer Service",
    "Registry",
    "Gift Cards",
    "Sell",
  ];

  const secondaryNavLinks = [
    "Video",
    "Deals",
    "Amazon Basics",
    "Best Sellers",
    "Livestreams",
    "Prime",
    "Gift Cards",
    "Buy Again",
    "Customer Service",
    "Home & Kitchen",
    "Electronics",
    "Books",
    "Fashion",
    "Toys & Games",
    "Health & Personal Care",
    "Beauty & Personal Care",
    "Sports & Outdoors",
    "Automotive",
    "Coupons",
    "Gift Ideas",
  ];

  return (
    <header
      ref={headerRef}
      className={`
        ${styles.headerWrapper}
        ${headerState === "hidden" ? styles.headerHidden : ""}
        ${headerState === "topFixed" ? styles.headerTopFixed : ""}
      `}
    >
      {/* Top Row */}
      <div className={styles.topRow}>
        <div className={styles.leftSection}>
          <button
            className={`${styles.menuBtn} ${
              isMobile ? "" : styles.hideOnDesktopFlex
            }`}
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaBars />
          </button>
          <img src={nav_logo} alt="Amazon Logo" className={styles.logo} />
          {/* DeliverTo for DESKTOP - hidden on mobile via CSS */}
          <div className={`${styles.deliverTo} ${styles.deliverToDesktop}`}>
            <FaMapMarkerAlt className={styles.locationIcon} />
            <div className={styles.deliverTextWrap}>
              <span className={styles.deliverLabel}>Deliver to</span>
              <span className={styles.deliverCountry}>Ethiopia</span>
            </div>
          </div>
        </div>

        {/* Center: Search Bar */}
        <form className={styles.searchBar}>
          <select className={styles.searchDropdown} title="Search category">
            <option>All</option>
            <option>Books</option>
            <option>Electronics</option>
            <option>Clothing</option>
          </select>
          <input
            className={styles.searchInput}
            placeholder="Search Amazon"
            aria-label="Search Amazon"
          />
          <button className={styles.searchBtn} type="submit" title="Search">
            <FaSearch />
          </button>
        </form>

        {/* Right: Language, Account, Orders, Cart */}
        <div className={styles.rightSection}>
          <div
            className={`${styles.langWrap} ${styles.hideOnMobile}`}
            onMouseEnter={() => setShowLangDropdown(true)}
            onMouseLeave={() => setShowLangDropdown(false)}
          >
            <img src={usa_flag} alt="EN" className={styles.flag} />
            <span className={styles.langText}>EN</span>
            <FiChevronDown className={styles.chevronIcon} />
            {showLangDropdown && (
              <div className={styles.dropdownMenu}>
                <div>EN - English</div>
                <div>ES - Español</div>
                <div>DE - Deutsch</div>
              </div>
            )}
          </div>
          {/* Account & Lists - Adapts for mobile */}
          <div
            className={styles.accountWrap}
            onMouseEnter={() => setShowAccountDropdown(true)}
            onMouseLeave={() => setShowAccountDropdown(false)}
          >
            <FaUser
              className={`${styles.accountIcon} ${styles.showOnMobile}`}
            />
            {isMobile ? (
              <span className={`${styles.boldText} ${styles.signInMobile}`}>
                Sign In{" "}
                <FiChevronDown className={styles.chevronIconMobileSignIn} />
              </span>
            ) : (
              <>
                <span className={styles.smallText}>Hello, sign in</span>
                <span className={styles.boldText}>
                  Account & Lists{" "}
                  <FiChevronDown className={styles.chevronIcon} />
                </span>
              </>
            )}
            {showAccountDropdown && (
              <div className={styles.dropdownMenu}>
                <div>Your Account</div>
                <div>Your Orders</div>
                <div>Sign Out</div>
              </div>
            )}
          </div>

          <div className={`${styles.ordersWrap} ${styles.hideOnMobile}`}>
            <span className={styles.smallText}>Returns</span>
            <span className={styles.boldText}>& Orders</span>
          </div>
          {/* Cart - Remains */}
          <div className={styles.cartWrap}>
            <HiOutlineShoppingCart className={styles.cartIcon} />
            <span className={styles.cartCount}>0</span>
            <span className={styles.cartText}>Cart</span>
          </div>
        </div>
      </div>

      {/* Secondary Nav Links (Scrollable on Mobile) */}
      <nav
        className={`
          ${styles.bottomRow}
          ${headerState !== "visible" ? styles.bottomRowHidden : ""}
        `}
      >
        {isMobile
          ? secondaryNavLinks.map((link) => (
              <span key={link} className={styles.navLink}>
                {link}
              </span>
            ))
          : desktopNavLinks.map((link) =>
              typeof link === "string" ? (
                <span key={link} className={styles.navLink}>
                  {link}
                </span>
              ) : (
                <span
                  key={link.name}
                  className={`${styles.navLink} ${styles.navLinkWithIcon}`}
                >
                  <link.icon className={styles.navIcon} />
                  {link.name}
                </span>
              )
            )}
      </nav>

      <div
        className={`
          ${styles.deliverTo}
          ${styles.deliverToMobile}
          ${headerState !== "visible" ? styles.bottomRowHidden : ""} 
        `}
      >
        <FaMapMarkerAlt className={styles.locationIcon} />
        <span className={styles.deliverCountry}>Deliver to Ethiopia</span>
      </div>

      {/* Responsive Mobile Menu (triggered by top-left hamburger) */}
      {showMenu && (
        <div className={styles.mobileMenu}>
          <div className={styles.mobileMenuHeader}>
            <FaUser className={styles.accountIcon} />{" "}
            {/* Icon in menu header */}
            <h3>Hello, Sign In</h3>
          </div>
          <span className={styles.navLink}>Home</span>
          <span className={styles.navLink}>Shop by Department</span>
          <span className={styles.navLink}>Today's Deals</span>
          {/* Add items from hidden top bar sections */}
          <div className={styles.mobileMenuItem}>
            {" "}
            {/* Orders */}
            <span className={styles.navLink}>Your Orders</span>
          </div>
          <div className={styles.mobileMenuItem}>
            {" "}
            {/* Language */}
            <span className={styles.navLink}>Language: EN</span>{" "}
            {/* Simplified or full dropdown */}
          </div>
          <span className={styles.navLink}>Customer Service</span>
          <span className={styles.navLink}>Settings</span>
          <span className={styles.navLink}>Sign Out</span>
        </div>
      )}
    </header>
  );
}

export default Header;
