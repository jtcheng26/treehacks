export default function Logo() {
    return (
        <div className="flex" style={{position: 'relative'}}>
            <div className="flex-row">
                <img src="assets/zazu.png" className="w-28 h-32"></img>
            </div> 
            <div className="flex-row" style={{position: 'relative'}}>
                <div style={{display:'inline-block', position: 'absolute', top: '58%', left: '50%', transform: 'translate(0, -50%)', width: '200px'}}>
                    <h1 className="font-bold font-sans" style={{fontSize: '50px', color: '#39b37a', lineHeight: '50px'}}>
                        Zazu
                    </h1>
                    <h3 className="font-sans" style={{color: '#4bb383'}}>
                        Your AI Teaching Assistant
                    </h3>
                </div>
            </div>
        </div>
    )
}