import { FC, useContext, useState } from "react"
import styles from "./Menu.module.scss"
import { Menu } from "antd"
import type { MenuProps } from 'antd'
import { HomeOutlined, InfoCircleOutlined } from '@ant-design/icons'
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import  * as menuActions from "../../redux/menu/menuSlice"
import { Switch } from "antd"
import { ThemeContext } from "../../context/themeContext"
import { PAGE_THEME } from "../../utils/helpers/constants"

const items: MenuProps['items'] = [
  {
    label: 'Main Page',
    key: 'main',
    icon: <HomeOutlined />,
  },
  {
    label: 'About Page',
    key: 'about',
    icon: <InfoCircleOutlined />
  }
];

const MenuComp: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { currentTheme, updateCurrentTheme } = useContext(ThemeContext)
  const selectedTab = useSelector((state: any) => state.menu.selectedTab)

  const onSwichTab: MenuProps['onClick'] = (e) => {
    console.log('menu clicked ', e);
    const menuKey = e?.key || '/'
    dispatch(menuActions.updateMenuTab(menuKey))
    navigate('/'+menuKey)
  };

  const onChangeTheme = (checked: boolean) => {
    console.log(`switch to ${checked}`);
    const newTheme = checked?PAGE_THEME.DARK:PAGE_THEME.LIGHT
    updateCurrentTheme(newTheme)
  };

  return (
    <>
      <div className={`${styles.menuComp}`}>
        <Menu onClick={onSwichTab} selectedKeys={[selectedTab]} mode="horizontal" items={items} theme={currentTheme==PAGE_THEME.DARK?'dark':'light'} />

        <div className={`${styles.swichMode}`}>
          <div className={currentTheme==PAGE_THEME.DARK?`${styles.isActive}`:''}>Dark Mode: </div>
          <div className={`${styles.swichModeBtn}`}>
            <Switch onChange={onChangeTheme} defaultChecked={currentTheme==PAGE_THEME.DARK?true:false} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuComp;