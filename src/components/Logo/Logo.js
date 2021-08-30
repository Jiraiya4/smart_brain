import "tachyons";
import Tilt from 'react-parallax-tilt'
import s from './Logo.module.css'
import brain from './brain.png'

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt tiltMaxAngleX='15' tiltMaxAngleY= '15' className={`br2 shadow-2 ${s.Tilt}`}>
                <div>
                    <h1 className={s.img}><img src={brain} alt="logo"/></h1>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo;