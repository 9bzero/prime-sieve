import{useState,useEffect,useRef,useCallback}from'react'
  export default function App(){
    const[n,setN]=useState(200)
    const[sieve,setSieve]=useState<boolean[]>([])
    const[step,setStep]=useState(0)
    const[current,setCurrent]=useState(2)
    const[running,setRunning]=useState(false)
    const[done,setDone]=useState(false)
    const[speed,setSpeed]=useState(80)
    const stoppedRef=useRef(false)
    const reset=useCallback((num=n)=>{
      stoppedRef.current=true
      setSieve(Array(num+1).fill(true).fill(false,0,2))
      setStep(0);setCurrent(2);setRunning(false);setDone(false)
    },[n])
    useEffect(()=>reset(n),[])
    const run=useCallback(()=>{
      if(done)return
      stoppedRef.current=false;setRunning(true)
      let p=current
      const go=()=>{
        if(stoppedRef.current||p*p>n){setRunning(false);setDone(true);return}
        setSieve(s=>{const ns=[...s];if(ns[p])for(let m=p*p;m<=n;m+=p)ns[m]=false;return ns})
        let next=p+1;while(next<=n&&sieve[next]===false&&next*next<=n)next++
        setCurrent(next);setStep(st=>st+1);p=next
        if(p*p<=n)setTimeout(go,Math.max(5,200-speed*2))
        else{setRunning(false);setDone(true)}
      }
      go()
    },[current,done,n,speed,sieve])
    const primes=sieve.map((v,i)=>v?i:-1).filter(v=>v>1)
    const cols=Math.ceil(Math.sqrt(n))
    return(
      <div style={{minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"1rem",padding:"1.5rem"}}>
        <h1 style={{fontWeight:800,fontSize:"1.5rem",color:"#f8fafc"}}>🔢 Sieve of Eratosthenes</h1>
        <div style={{display:"flex",gap:"0.75rem",alignItems:"center",flexWrap:"wrap",justifyContent:"center"}}>
          <select value={n} onChange={e=>{setN(+e.target.value);reset(+e.target.value)}} style={{background:"#1e293b",border:"1px solid #334155",borderRadius:6,padding:"0.35rem 0.75rem",color:"#e2e8f0",outline:"none",fontSize:"0.85rem"}}>
            {[100,200,400].map(v=><option key={v} value={v}>Up to {v}</option>)}
          </select>
          <button onClick={()=>reset(n)} style={{padding:"0.4rem 0.9rem",background:"#1e293b",color:"#94a3b8",border:"1px solid #334155",borderRadius:6,cursor:"pointer",fontSize:"0.82rem"}}>Reset</button>
          {!done&&<button onClick={running?()=>{stoppedRef.current=true;setRunning(false)}:run} style={{padding:"0.4rem 1.2rem",background:running?"#dc2626":"#0ea5e9",color:"#fff",border:"none",borderRadius:6,cursor:"pointer",fontWeight:700,fontSize:"0.82rem"}}>{running?"Pause":"Start"}</button>}
          <label style={{color:"#94a3b8",fontSize:"0.82rem",display:"flex",alignItems:"center",gap:"0.5rem"}}>Speed <input type="range" min="1" max="99" value={speed} onChange={e=>setSpeed(+e.target.value)} style={{accentColor:"#38bdf8"}}/></label>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat("+cols+", 1fr)",gap:2,maxWidth:500,width:"100%"}}>
          {Array.from({length:n-1},(_,i)=>i+2).map(num=>{
            const isPrime=sieve[num]
            const isCur=num===current&&!done
            const composite=!sieve[num]&&num>=2
            return(
              <div key={num} style={{aspectRatio:"1",background:isCur?"#f59e0b":isPrime?"#0ea5e9":composite?"#1e293b":"#0f172a",borderRadius:3,display:"flex",alignItems:"center",justifyContent:"center",fontSize:n>200?"0.5rem":"0.62rem",fontWeight:isPrime?700:400,color:isCur?"#0f172a":isPrime?"#fff":"#334155",transition:"background 0.2s",boxShadow:isCur?"0 0 6px #f59e0b":isPrime?"0 0 4px #0ea5e944":""}}>
                {n<=200&&num}
              </div>
            )
          })}
        </div>
        <div style={{display:"flex",gap:"1rem",fontSize:"0.82rem"}}>
          {[{c:"#0ea5e9",l:"Prime"},{ c:"#1e293b",l:"Composite"},{c:"#f59e0b",l:"Current"}].map(({c,l})=><div key={l} style={{display:"flex",alignItems:"center",gap:"0.4rem"}}><div style={{width:12,height:12,background:c,borderRadius:2}}/><span style={{color:"#94a3b8"}}>{l}</span></div>)}
        </div>
        <div style={{color:"#94a3b8",fontSize:"0.85rem"}}>{done?primes.length+" primes found up to "+n:"Step "+step+" — Checking multiples of "+current}</div>
      </div>
    )
  }