import styles from './Footer.module.css'
import facebook from '../../assets/images/Facebook.svg'
import whatsApp from '../../assets/images/WhatsApp.svg'
import Instagram from '../../assets/images/Instagram.svg'
import logoFudarpe from '../../assets/images/Marcas_governo.png'


function Footer() {
  return (
    <footer>
        
        <div className= {styles.container}>
            <div className={styles.top}>
                <h4>PAINEL</h4>
                <p>Editais e Oportunidades</p>
                <p>Nossos Eventos</p>
                <p>Nossos Espaços</p>
            </div>
            <div className= {styles.top}>
                <h4>CONTATOS</h4>
                <p>Dúvidas Frequentes</p>
                <p>Fale Conosco</p>
                <p>Central de Ajuda</p>
            </div>
            <div className={styles.top}>
                <h4>REDES SOCIAIS</h4>
                <div className={styles.social}>
                <img src={Instagram} alt="" className={styles.img}/>
                <img src={whatsApp} alt="" className={styles.img}/>
                <img src={facebook} alt="" className={styles.img}/>
                </div>
            </div>
            <div className= {styles.top}>

                <br />
                <br />
                <img src={logoFudarpe} alt="" width= '350px' />
            </div>
        </div>

      
    </footer>
  )
}

export default Footer