import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import {
  SvgMinimize,
  SvgZoom,
  SvgClose,
  SvgZoomOut,
  SvgArrowGoBack,
  SvgDropdownName,
} from "../../assets/svg";
import { WinEvent } from "../../constants/event";
import { useClickOutside } from "../../hooks";
import { CompanyContext } from "../../store/reducers";
import { Logo } from "../Logo/Logo";

import "./TitleBar.scss";

export const TitleBar: React.FC<ITitleBar> = ({ title }) => {
  const history = useHistory();
  const { pathname } = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const [isMaximized, setIsMaximized] = useState(true);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const { state } = useContext(CompanyContext);

  //useClickOutside
  useClickOutside(menuRef, () => {
    setIsOpenMenu(!isOpenMenu);
  });

  useEffect(() => {
    apiElectron.on(WinEvent.IS_MAXIMIZED, (_: any, ms: any) => {
      setIsMaximized(ms.isMaximized);
    });
  }, []);

  return (
    <div className="title-bar">
      {pathname === "/login" || pathname === "/register" || (
        <div className="title-bar__go-back" onClick={() => history.goBack()}>
          <SvgArrowGoBack />
        </div>
      )}

      <div className="title-bar__logo">
        <Logo />
        {pathname === "/login" || pathname === "/register" || (
          <div
            className="title-bar__avatar"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <span>{state.companyData.name}</span>
            <SvgDropdownName />
            {isOpenMenu && (
              <div className="title-bar__menu" ref={menuRef}>
                <div onClick={() => history.push("/company-profile")}>
                  Thông tin
                </div>
                <div onClick={() => history.push("/setting")}>Cài Đặt</div>
                <div onClick={() => history.replace("/login")}>Đăng xuất</div>
              </div>
            )}
          </div>
        )}
      </div>
      <span className="title-bar__title">{title}</span>
      <div className="title-bar__action">
        <div
          className="title-bar__close title-bar__close--nomal"
          onClick={() => apiElectron.sendMessages(WinEvent.WIN_MINIMIZE)}
        >
          <SvgMinimize />
        </div>
        <div
          className="title-bar__close title-bar__close--nomal"
          onClick={() => apiElectron.sendMessages(WinEvent.WIN_ZOOM)}
        >
          {isMaximized ? <SvgZoom /> : <SvgZoomOut />}
        </div>
        <div
          className="title-bar__close"
          onClick={() => apiElectron.sendMessages(WinEvent.WIN_CLOSE)}
        >
          <SvgClose />
        </div>
      </div>
    </div>
  );
};
