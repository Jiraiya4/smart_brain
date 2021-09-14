import s from "./Navigation.module.css"
import 'tachyons'

const Navigation = ({ onRouteChange, isSignedIn, onDeleteAccount }) => {
    return (
        <div>
            {isSignedIn
                ?
                <nav className={s.nav}>
                    <p
                        onClick={() => onRouteChange('signin')}
                        className='f3 link dim black underline pa3 pointer'>
                        Sign Out
                    </p>
                    <p
                        onClick={onDeleteAccount}
                        className='f3 link dim black underline pa3 pointer'>
                        Delete account
                    </p>
                </nav>
                :
                <nav className={s.nav}>
                    <p
                        onClick={() => onRouteChange('signin')}
                        className='f3 link dim black underline pa3 pointer'>
                        Sign In
                    </p>
                    <p
                        onClick={() => onRouteChange('register')}
                        className='f3 link dim black underline pa3 pointer'>
                        Register
                    </p>
                </nav>
            }
        </div>
    )
}

export default Navigation;