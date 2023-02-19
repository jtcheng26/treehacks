export default function Logo() {
    return (
        <div className="flex" style={{position: 'relative'}}>
            <div className="flex-row">
                <img src="assets/zazu.png" className="w-28 h-32"></img>
            </div> 
            <div className="flex-row" style={{position: 'relative'}}>
                <div style={{display:'inline-block', position: 'absolute', top: '7.8vh', transform: 'translate(0, -2.1vw)', width: '12vw'}}>
                    <h1 className="font-bold font-sans" style={{fontSize: '5vh', color: '#10B981', lineHeight: '5vh'}}>
                        Zazu
                    </h1>
                    <h3 className="font-sans" style={{color: '#10B981', fontSize: '1.7vh'}}>
                        Your AI Teaching Assistant
                    </h3>
                </div>
            </div>
        </div>
    )
}