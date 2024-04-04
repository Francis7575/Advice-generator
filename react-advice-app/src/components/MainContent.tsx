import styles from './MainContent.module.css'
import patternMobile from '../assets/pattern-divider-mobile.svg'
import patternDesktop from '../assets/pattern-divider-desktop.svg'
import iconDice from '../assets/icon-dice.svg'
import { useState, useEffect } from 'react'

type Advice = {
    id: number,
    advice: string
}

const MainContent = () => {
    const [advice, setAdvice] = useState<Advice>(
        {
            id: 117,
            advice: "It is easy to sit up and take notice, what's difficult is getting up and taking action."
        }
    );

    const getAdvice = async () => {
        try {
            const adviceGeneratorApi = await fetch(`https://api.adviceslip.com/advice`)
            const data = await adviceGeneratorApi.json()
            setAdvice(data.slip)
            console.log(data.slip)
        } catch (error) {
            console.error('Error fetching advice:', error);
        }
    }

    useEffect(() => {
        if (!advice) {
            getAdvice();
        }
    }, [advice])

    return (
        <main>
            <section className={styles.section}>
                <div className={styles.backgroundColor}>
                    <h1 className={styles.h1}>ADVICE #{advice.id}</h1>
                    <p className={styles.paragraph}>“{advice.advice}”</p>
                    <picture>
                        <img className={styles.patternMobile} src={patternMobile} alt="Line separator" />
                        <img className={styles.patternDesktop} src={patternDesktop} alt="Line separator" />
                    </picture>
                    <button className={styles.diceBtn} onClick={getAdvice}>
                        <img src={iconDice} alt="Icon dice" />
                    </button>
                </div>
            </section>
        </main>
    )
}

export default MainContent