import React from 'react';
import Head from 'next/head';

export default function HomePage2() {
  return (
    <>
      <Head>
        <title>One Dollar. One Child. One Future.</title>
      </Head>
      <style dangerouslySetInnerHTML={{
        __html: `
  :root{
    --navy:#0e2a4d;
    --navy-dark:#0a2040;
    --green:#1f8a4c;
    --green-dark:#166a3a;
    --gold:#f5b323;
    --red:#c0392b;
    --ink:#1b2430;
    --muted:#5b6672;
    --line:#e4e8ec;
    --bg:#ffffff;
    --bg-soft:#f6f8fa;
  }
  *{box-sizing:border-box;}
  html{scroll-behavior:smooth;}
  body{
    margin:0;
    font-family:'Segoe UI',system-ui,-apple-system,Arial,sans-serif;
    color:var(--ink);
    background:var(--bg);
    line-height:1.5;
  }
  h1,h2,h3{font-family:Georgia,'Times New Roman',serif; margin:0;}
  a{color:inherit;text-decoration:none;}
  img{max-width:100%;display:block;}
  .wrap{max-width:1500px;margin:0 auto;padding:0 48px;}
  .btn{
    display:inline-flex;align-items:center;gap:8px;
    padding:14px 26px;border-radius:8px;font-weight:600;
    font-size:0.95rem; cursor:pointer; border:2px solid transparent;
    transition:transform .15s ease, box-shadow .15s ease;
  }
  .btn:hover{transform:translateY(-2px);}
  .btn-green{background:var(--green);color:#fff;}
  .btn-green:hover{background:var(--green-dark);}
  .btn-outline{background:#fff;border-color:var(--navy);color:var(--navy);}
  .btn-gold{background:var(--gold);color:var(--navy-dark);}
  .btn-play{background:rgba(10,32,64,0.6);color:#fff;border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(4px);}
  .btn-play:hover{background:rgba(10,32,64,0.8);}
  .btn-play .play-circle{display:flex;align-items:center;justify-content:center;width:26px;height:26px;border-radius:50%;border:2px solid #fff;font-size:0.8rem;padding-left:2px;flex-shrink:0;}

  /* HEADER */
  header{
    border-bottom:1px solid var(--line);
    position:sticky;top:0;background:#fff;z-index:50;
  }
  .header-inner{
    display:flex;align-items:center;justify-content:space-between;
    padding:16px 48px; width:100%; max-width:1536px; margin:0 auto; box-sizing:border-box;
  }
  .brand{display:flex;align-items:center;gap:8px;font-family:Georgia,serif;font-weight:700;font-size:0.8rem;color:var(--navy);}
  .brand .mark{
    width:28px;height:28px;border-radius:6px;
    background:var(--navy);color:var(--gold);
    display:flex;align-items:center;justify-content:center;font-size:1rem;
  }
  nav{display:flex;gap:16px;font-size:0.86rem;font-weight:500;color:var(--ink);}
  nav a{opacity:0.85;}
  nav a.active{color:var(--green);opacity:1;border-bottom:2px solid var(--green);padding-bottom:6px;}
  .header-cta{white-space:nowrap;}

  /* HERO */
  .hero{
    background:
      linear-gradient(90deg, rgba(14, 42, 77, 0.95) 0%, rgba(14, 42, 77, 0.8) 45%, rgba(10, 32, 64, 0.1) 100%),
      url('hero-bg.jpg') no-repeat center center/cover;
    color:#fff; position:relative; overflow:hidden;
  }
  .hero-inner{
    display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;
    padding:64px 48px 48px;
  }
  .hero h1{font-size:2.6rem;line-height:1.15;margin-bottom:18px;}
  .hero h1 .accent{color:var(--gold);}
  .hero p{color:#cfd8e3;margin-bottom:14px;font-size:0.98rem;max-width:520px;}
  .hero-actions{display:flex;gap:14px;margin-top:22px;flex-wrap:wrap;}
  .hero-visual{
    position:relative;border-radius:14px;overflow:hidden;
    aspect-ratio:4/3;
    background:
      radial-gradient(circle at 30% 20%, rgba(245,179,35,0.25), transparent 55%),
      linear-gradient(135deg,#1c3d63,#0e2a4d 60%);
    display:flex;align-items:center;justify-content:center;
    border:1px solid rgba(255,255,255,0.08);
  }
  .hero-visual .glyph{font-size:5rem;opacity:0.9;}
  .hero-badge{
    position:absolute;bottom:85px;left:475px;background:#fff;color:var(--ink);
    border-radius:12px;padding:16px 18px;box-shadow:0 12px 30px rgba(0,0,0,0.18);
    width:max-content;font-size:0.85rem;
    display:flex;align-items:center;gap:14px;
  }
  .hero-badge .icon{
    background:#3a833a;color:#fff;
    width:42px;height:42px;border-radius:50%;
    display:flex;align-items:center;justify-content:center;
    font-size:1.4rem;flex-shrink:0;
  }
  .hero-badge b:last-child{color:var(--green);}

  .trust-strip{
    display:flex;flex-wrap:wrap;gap:24px;justify-content:flex-start;
    padding:18px 48px; margin-top:-24px;
    font-size:0.82rem;color:#c6d0dc;
  }
  .trust-strip span{display:flex;align-items:center;gap:8px;}

  /* STATS */
  .stats-wrapper {
    position:relative; z-index:10; margin-top:-40px; margin-bottom:0px;
  }
  .stats{
    display:grid;grid-template-columns:repeat(5,1fr);
    background:#fff;border-radius:12px;box-shadow:0 8px 30px rgba(0,0,0,0.06);
    border: 1px solid var(--line);
  }
  .stat{
    padding:20px 16px;display:flex;align-items:center;gap:14px;
    border-right:1px solid var(--line);text-align:left;
  }
  .stat:last-child{border-right:none;}
  .stat-icon{display:flex;align-items:center;justify-content:center;flex-shrink:0;}
  .stat-text{display:flex;flex-direction:column;}
  .stat .num{font-size:1.6rem;font-weight:700;font-family:'Segoe UI',sans-serif;line-height:1.1;}
  .stat .lbl{font-size:0.75rem;color:var(--muted);margin-top:2px;line-height:1.2;font-weight:600;}

  /* SECTION HEADS */
  section{padding:64px 0;}
  #impact{padding-top:32px;}
  .section-title{text-align:center;font-size:1.9rem;color:var(--navy);margin-bottom:36px;}

  /* WHY NEEDED */
  .compare{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
  .panel{border-radius:12px;padding:22px;border:1px solid var(--line);}
  .panel.good{border-color:#bfe3cc;background:#f4fbf6;}
  .panel.bad{border-color:#f1c3bc;background:#fdf5f3;}
  .panel h3{font-size:1.05rem;margin-bottom:16px;display:flex;align-items:center;gap:8px;}
  .panel.good h3{color:var(--green-dark);}
  .panel.bad h3{color:var(--red);}
  .item-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:16px;}
  .panel.bad .item-grid{grid-template-columns:repeat(5,1fr);}
  .item{text-align:center;font-size:0.78rem;color:var(--muted);}
  .item .ic{font-size:1.5rem;display:flex;justify-content:center;margin-bottom:6px;}
  .panel.good .item .ic{color:var(--green);}
  .panel.bad .item .ic{color:var(--red);}
  .item b{display:block;color:var(--ink);font-size:0.82rem;margin-bottom:2px;}
  .panel-photo{
    height:120px;border-radius:8px;margin-top:6px;
    display:flex;align-items:center;justify-content:center;font-size:2.2rem;
    overflow:hidden;
  }
  .panel-photo img{width:100%;height:100%;object-fit:cover;}
  .panel.good .panel-photo{background:linear-gradient(135deg,#dff3e6,#c6e9d3);color:var(--green-dark);}
  .panel.bad .panel-photo{background:linear-gradient(135deg,#f6dcd6,#f0c7bd);color:var(--red);}

  .callout{
    display:flex;align-items:center;gap:24px;
    background:#fff8e6;border:1px solid #f3dfa1;border-radius:10px;
    padding:24px 48px;font-size:1.1rem;color:#6b5313;justify-content:center;text-align:left;
    margin:32px auto 0; max-width:960px;
  }
  .callout .heart { font-size: 2.5rem; line-height: 1; flex-shrink:0; }

  /* WHAT $1 HELPS */
  .flow{display:flex;align-items:stretch;gap:12px;flex-wrap:wrap;justify-content:center;}
  .flow-card{
    flex:1 1 0;min-width:180px;display:flex;align-items:center;gap:14px;text-align:left;background:#fff;
    border-radius:8px;padding:18px 20px;border:1px solid var(--line);
  }
  .flow-card .ic{flex-shrink:0;display:flex;align-items:center;justify-content:center;}
  .flow-card .text-wrap{display:flex;flex-direction:column;}
  .flow-card h4{font-size:0.95rem;margin:0 0 4px 0;color:var(--navy);}
  .flow-card p{font-size:0.78rem;color:var(--muted);margin:0;line-height:1.3;}
  .arrow{color:var(--muted);font-size:1.4rem;display:flex;align-items:center;}

  /* HOW IT WORKS */
  .steps-wrap{display:flex;align-items:flex-start;justify-content:space-between;margin-top:24px;gap:8px;}
  .step{flex:1;text-align:center;display:flex;flex-direction:column;align-items:center;}
  .step-head{display:flex;align-items:center;justify-content:center;gap:12px;margin-bottom:16px;}
  .step-num{
    width:36px;height:36px;border-radius:50%;color:#fff;
    display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1.2rem;flex-shrink:0;
  }
  .step:nth-child(1) .step-num { background: #002147; }
  .step:nth-child(3) .step-num { background: #3d9326; }
  .step:nth-child(5) .step-num { background: #e85d04; }
  .step:nth-child(7) .step-num { background: #6a4c93; }
  .step:nth-child(9) .step-num { background: #002147; }
  
  .step-ic{color:#002147;display:flex;align-items:center;justify-content:center;}
  .step h4{font-size:0.95rem;margin:0 0 6px 0;color:var(--navy);}
  .step p{font-size:0.8rem;color:var(--muted);line-height:1.4;margin:0;max-width:180px;}

  .step-arrow{
    flex-shrink:0; margin-top:22px; display:flex; align-items:center; justify-content:center;
  }

  /* FOUNDER + TRANSPARENCY */
  .two-col{display:grid;grid-template-columns:47fr 53fr;gap:24px;}
  .card{border:1px solid var(--line);border-radius:12px;padding:26px;}
  .founder{display:flex;gap:18px;}
  .founder-photo{
    width:110px;height:130px;border-radius:8px;flex-shrink:0;
    background:linear-gradient(135deg,#d9e4f0,#b9cbe0);
    display:flex;align-items:center;justify-content:center;font-size:2.4rem;color:var(--navy);
  }
  .founder h3{font-size:1.05rem;color:var(--navy);}
  .founder .role{font-size:0.78rem;color:var(--muted);margin-bottom:10px;}
  .founder p{font-size:0.82rem;color:var(--ink);margin:8px 0;}
  .signature{font-family:'Brush Script MT',cursive;font-size:1.3rem;color:var(--navy);margin-top:10px;}

  .checklist{list-style:none;margin:0;padding:0;}
  .checklist li{
    display:flex;gap:10px;align-items:flex-start;font-size:0.88rem;
    padding:8px 0;border-bottom:1px dashed var(--line);
  }
  .checklist li:last-child{border-bottom:none;}
  .checklist .tick{color:var(--green);font-weight:700;}

  .donut-row{display:flex;align-items:center;gap:24px;margin-top:16px;}
  .donut{
    width:130px;height:130px;border-radius:50%;flex-shrink:0;
    background:conic-gradient(var(--green) 0% 70%, var(--gold) 70% 85%, #7a5fb0 85% 95%, #3b7fd1 95% 100%);
    position:relative;
  }
  .donut::after{
    content:"";position:absolute;inset:22px;background:#fff;border-radius:50%;
  }
  .donut-legend{font-size:0.8rem;}
  .donut-legend div{display:flex;align-items:center;gap:8px;margin-bottom:6px;}
  .swatch{width:10px;height:10px;border-radius:2px;}

  /* STORIES */
  .stories{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
  .story-card{border:1px solid var(--line);border-radius:12px;overflow:hidden;display:flex;align-items:stretch;}
  .story-photo{
    width:40%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:2.4rem;
    background:linear-gradient(135deg,#eef2f7,#dde5ee);color:var(--navy);
  }
  .story-body{padding:12px;display:flex;flex-direction:column;justify-content:center;}
  .story-body h4{font-size:0.95rem;margin-bottom:4px;}
  .story-body p{font-size:0.8rem;color:var(--muted);margin:0 0 8px;flex:1;}
  .story-body a{font-size:0.8rem;color:var(--navy);font-weight:600;display:flex;align-items:center;gap:4px;}

  /* CTA BANNER */
  .cta-banner{
    background:var(--navy-dark);color:#fff;border-radius:14px;
    padding:32px 24px;display:flex;flex-direction:column;justify-content:center;height:100%;
  }
  .cta-banner h3{font-size:1.4rem;margin-bottom:12px;line-height:1.2;}
  .cta-banner p{color:#c6d0dc;font-size:0.9rem;margin:0 0 24px 0;line-height:1.4;}

  /* WAYS TO GIVE */
  .give-option{flex:1;border-left:1px solid var(--line);padding:0 12px;display:flex;flex-direction:column;justify-content:space-between;}
  .give-option:first-child{border-left:none;}
  .give-option .ic{font-size:1.6rem;color:var(--navy);margin-right:8px;}
  .give-option-text h4{font-size:0.85rem;color:var(--navy);margin:0;}
  .give-option-text p{font-size:0.7rem;color:var(--muted);margin:0;line-height:1.2;}

  /* FOOTER */
  footer{background:var(--navy-dark);color:#c6d0dc;padding:48px 0 20px;font-size:0.85rem;}
  .footer-grid{display:grid;grid-template-columns:1.5fr repeat(4,1fr);gap:24px;margin-bottom:32px;}
  .footer-grid h5{color:#fff;font-size:0.85rem;margin-bottom:12px;}
  .footer-grid ul{list-style:none;margin:0;padding:0;}
  .footer-grid li{margin-bottom:8px;}
  .footer-grid a:hover{color:#fff;}
  .newsletter{display:flex;gap:8px;margin-top:10px;}
  .newsletter input{
    flex:1;padding:10px 12px;border-radius:6px;border:none;font-size:0.82rem;
  }
  .footer-bottom{border-top:1px solid rgba(255,255,255,0.12);padding-top:18px;
    display:flex;justify-content:space-between;flex-wrap:wrap;gap:10px;font-size:0.78rem;color:#8fa0b3;}
  .socials{display:flex;gap:14px;margin-top:10px;}

  @media (max-width:900px){
    .header-inner{flex-direction:column-reverse; gap:12px; justify-content:center;}
    .hero-inner{grid-template-columns:1fr; text-align:center;}
    .hero-actions{justify-content:center;}
    .stats{grid-template-columns:repeat(3,1fr);}
    .stat:nth-child(3){border-right:none;}
    .compare,.two-col{grid-template-columns:1fr;}
    .item-grid{grid-template-columns:repeat(2,1fr);}
    .stories{grid-template-columns:1fr;}
    .give-grid{grid-template-columns:repeat(2,1fr);}
    .footer-grid{grid-template-columns:repeat(2,1fr);}
    nav{display:none;}
  }
  @media (max-width:600px){
    .stats{grid-template-columns:1fr;}
    .stat{border-right:none; border-bottom:1px solid var(--line);}
    .stat:last-child{border-bottom:none;}
    .item-grid{grid-template-columns:1fr;}
    .give-grid{grid-template-columns:1fr;}
    .footer-grid{grid-template-columns:1fr;}
    .hero h1{font-size:2rem;}
  }
`
      }} />


<header>
  <div className="header-inner">
    <div className="brand">
      <div className="mark">◆</div>
      One Dollar. One Child. One Future.
    </div>
    <nav>
      <a href="#home" className="active">Home</a>
      <a href="#story">Our Story</a>
      <a href="#how">How It Works</a>
      <a href="#impact">Our Impact</a>
      <a href="#transparency">Transparency</a>
      <a href="#involved">Get Involved</a>
      <a href="#faq">FAQ</a>
    </nav>
    <a className="btn btn-green header-cta">♥ Give $1 a Day</a>
  </div>
</header>

<section className="hero" id="home" style={{ paddingTop: '0' }}>
  <div className="hero-inner wrap">
    <div>
      <h1>One Dollar. One Child.<br /><span className="accent">One Future.</span></h1>
      <p>In countries like Canada, quality public education is a blessing many families can rely on. In many underserved communities, children are not given that same safe start.</p>
      <p>Some children study in damaged, overcrowded government schools with limited materials, irregular teaching, and unsafe conditions. Your $1 a day, shared with others, helps move carefully selected children from low-income families into affordable, quality private schools where they can learn safely, consistently, and with dignity.</p>
      <div className="hero-actions">
        <a className="btn btn-green">♥ Give $1 a Day</a>
        <a className="btn btn-play"><span className="play-circle">▶</span> See How It Works</a>
      </div>
    </div>
    <div style={{ position: 'relative', height: '100%', minHeight: '350px' }}>
      <div className="hero-badge">
        <div className="icon">♥</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', lineHeight: '1.3' }}>
          <b>Small gift.</b>
          <b>Shared by many.</b>
          <b>Life-changing opportunity.</b>
        </div>
      </div>
    </div>
  </div>
  <div className="trust-strip wrap">
    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-heart-handshake-icon lucide-heart-handshake"><path d="M19.414 14.414C21 12.828 22 11.5 22 9.5a5.5 5.5 0 0 0-9.591-3.676.6.6 0 0 1-.818.001A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.535 5.362a2 2 0 0 0 2.879.052 2.12 2.12 0 0 0-.004-3 2.124 2.124 0 1 0 3-3 2.124 2.124 0 0 0 3.004 0 2 2 0 0 0 0-2.828l-1.881-1.882a2.41 2.41 0 0 0-3.409 0l-1.71 1.71a2 2 0 0 1-2.828 0 2 2 0 0 1 0-2.828l2.823-2.762"/></svg> Pooled Donations</span>
    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-school-icon lucide-school"><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 4.933V21"/><path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6"/><path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11"/><path d="M6 4.933V21"/><circle cx="12" cy="9" r="2"/></svg> Vetted Private Schools</span>
    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check-icon lucide-shield-check"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg> Child Safeguarding</span>
    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text-icon lucide-file-text"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg> 6-Month Progress Reports</span>
    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-clipboard-check-icon lucide-clipboard-check"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="m9 14 2 2 4-4"/></svg> Transparent Reporting</span>
  </div>
</section>

<div className="wrap stats-wrapper">
  <div className="stats">
    <div className="stat">
      <div className="stat-icon" style={{ color: '#1c3d63' }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
      <div className="stat-text"><div className="num" style={{ color: '#1c3d63' }}>100</div><div className="lbl">Children Supported</div></div>
    </div>
    <div className="stat">
      <div className="stat-icon" style={{ color: '#3a833a' }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 4.933V21"/><path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6"/><path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11"/><path d="M6 4.933V21"/><circle cx="12" cy="9" r="2"/></svg></div>
      <div className="stat-text"><div className="num" style={{ color: '#3a833a' }}>10</div><div className="lbl">Partner Schools</div></div>
    </div>
    <div className="stat">
      <div className="stat-icon" style={{ color: '#e85d04' }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg></div>
      <div className="stat-text"><div className="num" style={{ color: '#e85d04' }}>10,000</div><div className="lbl">Books &amp; Learning<br />Materials</div></div>
    </div>
    <div className="stat">
      <div className="stat-icon" style={{ color: '#6a4c93' }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
      <div className="stat-text"><div className="num" style={{ color: '#6a4c93' }}>1,000</div><div className="lbl">Monthly Supporters</div></div>
    </div>
    <div className="stat">
      <div className="stat-icon" style={{ color: '#1c3d63' }}><svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg></div>
      <div className="stat-text"><div className="num" style={{ color: '#1c3d63' }}>6-Month</div><div className="lbl">Reporting</div></div>
    </div>
  </div>
</div>

<section id="impact">
  <div className="wrap">
    <h2 className="section-title">Why This Help Is Needed</h2>
    <div className="compare">
      <div className="panel good">
        <h3>What many families in developed nation take for granted</h3>
        <div className="item-grid">
          <div className="item"><span className="ic"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-library-big-icon lucide-library-big"><rect width="8" height="18" x="3" y="3" rx="1"/><path d="M7 3v18"/><path d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"/></svg></span><b>Safe Classrooms</b>Clean, well-built learning spaces</div>
          <div className="item"><span className="ic"><img src="icons8-teacher-32.png" alt="teacher" width="24" height="24"  /></span><b>Regular Teachers</b>Qualified teachers who show up</div>
          <div className="item"><span className="ic"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-library-icon lucide-library"><path d="m16 6 4 14"/><path d="M12 6v14"/><path d="M8 8v12"/><path d="M4 4v16"/></svg></span><b>School Libraries</b>Access to books and technology</div>
          <div className="item"><span className="ic"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-building-community"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 9l5 5v7h-5v-4m0 4h-5v-7l5 -5m1 1v-6a1 1 0 0 1 1 -1h10a1 1 0 0 1 1 1v17h-8" /><path d="M13 7l0 .01" /><path d="M17 7l0 .01" /><path d="M17 11l0 .01" /><path d="M17 15l0 .01" /></svg></span><b>Good Infrastructure</b>Proper sanitation, water, and facilities</div>
        </div>
        <div className="panel-photo"><img src="classroom.png" alt="classroom" /></div>
      </div>
      <div className="panel bad">
        <h3>🌍 What many children still face in underdeveloped countries </h3>
        <div className="item-grid">
          <div className="item">
            <span className="ic">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L1 10.5l1.5 2L4 11.3V22h16v-10.7l1.5 1.2 1.5-2L12 2zM10.5 4.5l2 3-1.5 1.5 2 3-3-1.5 1.5-4-1-2zM7 11h2v3H7v-3zm8 0h2v3h-2v-3zm-5 4h4v5h-4v-5z"/>
              </svg>
            </span>
            <b>Damaged Buildings</b>Cracked walls, leaky roofs, unsafe spaces
          </div>
          <div className="item">
            <span className="ic">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="7" r="4"/><path d="M12 12c-3.3 0-6 2.2-6 5v4h12v-4c0-2.8-2.7-5-6-5z"/><circle cx="5" cy="9" r="3"/><path d="M5 13c-1.8 0-3.3 1-4 2.5v3.5h3.5v-6z"/><circle cx="19" cy="9" r="3"/><path d="M19 13c1.8 0 3.3 1 4 2.5v3.5h-3.5v-6z"/>
              </svg>
            </span>
            <b>Overcrowded Classes</b>Too many students, not enough space
          </div>
          <div className="item">
            <span className="ic">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 4H12v15s3-1 9-1V4zM3 4h9v15s-3-1-9-1V4zm4 4h3v1.5H7V8zm0 3h3v1.5H7v-1.5zm0 3h3v1.5H7v-1.5zm7-6h3v1.5h-3V8zm0 3h3v1.5h-3v-1.5zm0 3h3v1.5h-3v-1.5z"/>
              </svg>
            </span>
            <b>Few Books &amp; Materials</b>Limited or no books, no stationery
          </div>
          <div className="item">
            <span className="ic">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 10a4 4 0 1 0-8 0 4 4 0 0 0 8 0zm-4 5c-3.3 0-6 2.2-6 5v2h12v-2c0-2.8-2.7-5-6-5zm8-13v8h5V2h-5zm0 9v3h3v-3h-3z"/>
              </svg>
            </span>
            <b>Irregular Teaching</b>Teachers often absent or overburdened
          </div>
          <div className="item">
            <span className="ic">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 3v5c0 1.1.9 2 2 2h3v2H6c-2.2 0-4 1.8-4 4v5h2v-5c0-1.1.9-2 2-2h5v5h2v-5h3c1.1 0 2 .9 2 2v5h2v-5c0-2.2-1.8-4-4-4h-3v-2h3c1.1 0 2-.9 2-2V3H6zm10 2v3h-8V5h8zM10 14c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
              </svg>
            </span>
            <b>Poor Sanitation</b>No clean toilets or safe water
          </div>
        </div>
        <div className="panel-photo"><img src="underdeveloped class.png" alt="rural class" /></div>
      </div>
    </div>
    <div className="callout">
      <span className="heart">❤️</span>
      Your support helps close this gap by moving children into affordable, quality private schools where they can learn with dignity and consistency.
    </div>
  </div>
</section>

<section style={{ background: 'none', borderTop: '1px solid var(--line)', padding: '40px 0 64px', marginTop: '16px' }}>
  <div className="wrap">
    <h2 className="section-title">What Your $1 Helps Make Possible</h2>
    <div className="flow">
      <div className="flow-card">
        <div className="ic" style={{ color: '#3d9326' }}><svg xmlns="http://www.w3.org/2000/svg" width="50" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L2 9h2v13h16V9h2L12 2zm3 17h-2v-4h-2v4H9v-7h6v7zm3-9v9h-1V9H7v9H6V10H4.7l7.3-5.3L19.3 10H18z"/></svg></div>
        <div className="text-wrap"><h4>School Fees</h4><p>Keeps a child enrolled in a quality school</p></div>
      </div>
      <div className="arrow">→</div>
      <div className="flow-card">
        <div className="ic" style={{ color: '#e85d04' }}><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M21 4H12v15s3-1 9-1V4zM3 4h9v15s-3-1-9-1V4zm4 4h3v1.5H7V8zm0 3h3v1.5H7v-1.5zm0 3h3v1.5H7v-1.5zm7-6h3v1.5h-3V8zm0 3h3v1.5h-3v-1.5zm0 3h3v1.5h-3v-1.5z"/></svg></div>
        <div className="text-wrap"><h4>Books</h4><p>Gives access to learning materials</p></div>
      </div>
      <div className="arrow">→</div>
      <div className="flow-card">
        <div className="ic" style={{ color: '#6a4c93' }}><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M12 4c-1.5 0-2.5 1-3 1.5L4 8v3l2.5-1V20h11v-10l2.5 1V8l-5-2.5c-.5-.5-1.5-1.5-3-1.5z"/></svg></div>
        <div className="text-wrap"><h4>Uniforms</h4><p>Builds confidence and equality</p></div>
      </div>
      <div className="arrow">→</div>
      <div className="flow-card">
        <div className="ic" style={{ color: '#1c3d63' }}><svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg></div>
        <div className="text-wrap"><h4>Stationery</h4><p>Supports daily classroom learning</p></div>
      </div>
      <div className="arrow">→</div>
      <div className="flow-card">
        <div className="ic" style={{ color: '#2d7a36' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <div className="text-wrap"><h4>Safer Classrooms</h4><p>Cleaner, safer learning spaces</p></div>
      </div>
      <div className="arrow">→</div>
      <div className="flow-card">
        <div className="ic" style={{ color: '#002147' }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L1 8l11 6 11-6-11-6z"/><path d="M5.5 12.5L12 16l6.5-3.5v4c0 1.5-3 3-6.5 3s-6.5-1.5-6.5-3v-4z"/><rect x="21" y="9" width="1.5" height="6"/>
          </svg>
        </div>
        <div className="text-wrap"><h4>Regular Learning</h4><p>Consistent teaching. Better futures.</p></div>
      </div>
    </div>
  </div>
</section>

<section id="how" style={{ paddingTop: '16px' }}>
  <div className="wrap">
    <h2 className="section-title">How It Works</h2>
    <div className="steps-wrap">
      <div className="step">
        <div className="step-head">
          <div className="step-num">1</div>
          <div className="step-ic"><svg xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            viewBox="0 0 24 24"
            fill="currentColor">

            <!-- Student -->
            <path d="M10 11c2.2 0 4-1.8 4-4S12.2 3 10 3 6 4.8 6 7s1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h11v-2c0-1.1.4-2.1 1-2.9C12.8 13.4 11.4 13 10 13z"/>

            <!-- Search -->
            <path d="M16.5 13a3.5 3.5 0 1 0 2.24 6.19l2.53 2.53 1.06-1.06-2.53-2.53A3.5 3.5 0 0 0 16.5 13zm0 1.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"/>
          </svg>
          </div>
        </div>
        <h4>Need Identified</h4><p>We work with trusted partners to identify needy children.</p>
      </div>
      <div className="step-arrow"><svg width="50" height="20" viewBox="0 0 50 20" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="0" y1="10" x2="42" y2="10" strokeDasharray="6 6" /><polyline points="36 4 44 10 36 16" /></svg></div>
      <div className="step">
        <div className="step-head">
          <div className="step-num">2</div>
          <div className="step-ic"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-school-icon lucide-school"><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M18 4.933V21"/><path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6"/><path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11"/><path d="M6 4.933V21"/><circle cx="12" cy="9" r="2"/></svg></div>
        </div>
        <h4>School Selected</h4><p>Schools are carefully vetted for quality, safety, and values.</p>
      </div>
      <div className="step-arrow"><svg width="50" height="20" viewBox="0 0 50 20" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="0" y1="10" x2="42" y2="10" strokeDasharray="6 6" /><polyline points="36 4 44 10 36 16" /></svg></div>
      <div className="step">
        <div className="step-head">
          <div className="step-num">3</div>
          <div className="step-ic"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4z"/></svg></div>
        </div>
        <h4>Child Enrolled</h4><p>We enroll children, pay school fees, and provide basics.</p>
      </div>
      <div className="step-arrow"><svg width="50" height="20" viewBox="0 0 50 20" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="0" y1="10" x2="42" y2="10" strokeDasharray="6 6" /><polyline points="36 4 44 10 36 16" /></svg></div>
      <div className="step">
        <div className="step-head">
          <div className="step-num">4</div>
          <div className="step-ic"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open-text-icon lucide-book-open-text"><path d="M12 7v14"/><path d="M16 12h2"/><path d="M16 8h2"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/><path d="M6 12h2"/><path d="M6 8h2"/></svg></div>
        </div>
        <h4>Child Learns</h4><p>Children attend school regularly and receive consistent support.</p>
      </div>
      <div className="step-arrow"><svg width="50" height="20" viewBox="0 0 50 20" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="0" y1="10" x2="42" y2="10" strokeDasharray="6 6" /><polyline points="36 4 44 10 36 16" /></svg></div>
      <div className="step">
        <div className="step-head">
          <div className="step-num">5</div>
          <div className="step-ic"><svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 24 24" fill="currentColor"><path d="M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM6 20V4h5v7h7v9H6z"/></svg></div>
        </div>
        <h4>Progress Shared</h4><p>We share a progress report every 6 months with you.</p>
      </div>
    </div>
  </div>
</section>

<section id="story" style={{ background: 'none' }}>
  <div className="wrap two-col">
    <div className="card founder">
      <div className="founder-photo">🧑‍🎓</div>
      <div>
        <h3>A Message from Our Founder</h3>
        <div className="role">Sarah Haider — Student Founder | Grade 10, John Fraser Secondary School, Mississauga</div>
        <p>I realized that while students in places like Canada benefit from safe, public education, many children elsewhere do not receive the same basic opportunity.</p>
        <p>I started this initiative because I believe even one dollar a day, when given collectively, can help create fairer access to education.</p>
        <p>My goal is to build a legacy of compassion, accountability, and action — where every child has a chance to learn and dream.</p>
        <div className="signature">Sarah Haider</div>
      </div>
    </div>

    <div className="card" id="transparency" style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <div style={{ flex: '1' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--navy)', fontSize: '1.1rem', textAlign: 'center' }}>Our Commitment to Transparency</h3>
        <ul className="checklist">
          <li><span className="tick" style={{ background: 'var(--green)', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', marginRight: '8px' }}>✓</span>Needy families carefully screened</li>
          <li><span className="tick" style={{ background: 'var(--green)', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', marginRight: '8px' }}>✓</span>Private schools vetted for quality and safety</li>
          <li><span className="tick" style={{ background: 'var(--green)', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', marginRight: '8px' }}>✓</span>Donations pooled for verified education support</li>
          <li><span className="tick" style={{ background: 'var(--green)', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', marginRight: '8px' }}>✓</span>Child stories shared only with proper consent</li>
          <li><span className="tick" style={{ background: 'var(--green)', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', marginRight: '8px' }}>✓</span>Progress reports every 6 months</li>
          <li><span className="tick" style={{ background: 'var(--green)', color: '#fff', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', marginRight: '8px' }}>✓</span>Clear financial reporting</li>
        </ul>
      </div>
      
      <div className="card" style={{ flex: '1.1', padding: '20px' }}>
        <h3 style={{ marginBottom: '16px', color: 'var(--navy)', fontSize: '1.05rem', textAlign: 'center' }}>What Your Donation Supports</h3>
        <div className="donut-row">
          <div className="donut"></div>
          <div className="donut-legend">
            <div><span className="swatch" style={{ background: 'var(--green)' }}></span>70% School Fees</div>
            <div><span className="swatch" style={{ background: 'var(--gold)' }}></span>15% Books &amp; Materials</div>
            <div><span className="swatch" style={{ background: '#7a5fb0' }}></span>10% Uniforms &amp; Stationery</div>
            <div><span className="swatch" style={{ background: '#3b7fd1' }}></span>5% Monitoring &amp; Reporting</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section style={{ marginBottom: '60px' }}>
  <div className="wrap" style={{ display: 'flex', gap: '20px', alignItems: 'stretch' }}>
    
    <!-- LEFT COLUMN -->
    <div style={{ flex: '2.4', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <h2 className="section-title" style={{ margin: '0' }}>Real Potential. Better Futures.</h2>
      
      <div className="stories" style={{ marginBottom: '4px' }}>
        <div className="story-card">
          <div className="story-photo" style={{ background: 'url(\'https://images.pexels.com/photos/1381679/pexels-photo-1381679.jpeg?auto=compress&cs=tinysrgb&w=300\') center/cover' }}></div>
          <div className="story-body">
            <h4>Amina, 11</h4>
            <p>Dreams of becoming a doctor.</p>
            <a href="#">Read Amina's story →</a>
          </div>
        </div>
        <div className="story-card">
          <div className="story-photo" style={{ background: 'url(\'https://images.pexels.com/photos/1648377/pexels-photo-1648377.jpeg?auto=compress&cs=tinysrgb&w=300\') center/cover' }}></div>
          <div className="story-body">
            <h4>Rahul, 12</h4>
            <p>Loves building things and wants to be an engineer.</p>
            <a href="#">Read Rahul's story →</a>
          </div>
        </div>
        <div className="story-card">
          <div className="story-photo" style={{ background: 'url(\'https://images.pexels.com/photos/3336153/pexels-photo-3336153.jpeg?auto=compress&cs=tinysrgb&w=300\') center/cover' }}></div>
          <div className="story-body">
            <h4>Fatima, 9</h4>
            <p>Enjoys reading and hopes to teach one day.</p>
            <a href="#">Read Fatima's story →</a>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: '16px', display: 'flex', alignItems: 'center', gap: '16px', flex: '1' }}>
        <h3 style={{ fontSize: '1.1rem', color: 'var(--navy)', width: '70px', lineHeight: '1.2', margin: '0' }}>Ways to Give</h3>
        
        <div style={{ flex: '1', display: 'flex' }}>
          <div className="give-option">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div className="ic" style={{ color: 'var(--green)' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <div className="give-option-text">
                <h4>$1 A Day</h4>
                <p>Small amount.<br />Big change.</p>
              </div>
            </div>
            <a className="btn btn-green" style={{ width: '100%', padding: '8px 0', fontSize: '0.75rem', justifyContent: 'center' }}>Give $1 a Day</a>
          </div>
          
          <div className="give-option">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div className="ic">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
              </div>
              <div className="give-option-text">
                <h4>$30 / Month</h4>
                <p>Consistent support<br />creates real change.</p>
              </div>
            </div>
            <a className="btn btn-outline" style={{ width: '100%', padding: '8px 0', fontSize: '0.75rem', justifyContent: 'center' }}>Give Monthly</a>
          </div>

          <div className="give-option">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div className="ic">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8v13"/><path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/><path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/></svg>
              </div>
              <div className="give-option-text">
                <h4>$365 / Year</h4>
                <p>Make a year of<br />learning possible.</p>
              </div>
            </div>
            <a className="btn btn-outline" style={{ width: '100%', padding: '8px 0', fontSize: '0.75rem', justifyContent: 'center' }}>Give Annually</a>
          </div>

          <div className="give-option">
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
              <div className="ic">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/><path d="M12 15h.01"/><path d="M22 20s-2-2-4-2c-2.5 0-3 2-6 2s-6-1-8-2-2 2-2 2"/></svg>
              </div>
              <div className="give-option-text">
                <h4>Custom Gift</h4>
                <p>Give any amount<br />that works for you.</p>
              </div>
            </div>
            <a className="btn btn-outline" style={{ width: '100%', padding: '8px 0', fontSize: '0.75rem', justifyContent: 'center' }}>Give Now</a>
          </div>
        </div>
      </div>
    </div>

    <!-- RIGHT COLUMN -->
    <div style={{ flex: '1' }}>
      <div className="cta-banner">
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
          <div style={{ color: 'var(--gold)', fontSize: '3.5rem', lineHeight: '0.8' }}>♥</div>
          <div>
            <h3>Your dollar today.<br />Their future tomorrow.</h3>
            <p>Together, we can build a world where every child can learn, grow, and dream.</p>
          </div>
        </div>
        <a className="btn btn-gold" style={{ width: '100%', justifyContent: 'center', padding: '12px 0', fontSize: '1rem', marginTop: 'auto' }}>Start Giving</a>
      </div>
    </div>

  </div>
</section>

<footer id="faq">
  <div className="wrap">
    <div className="footer-grid">
      <div>
        <div className="brand" style={{ color: '#fff', marginBottom: '10px' }}>
          <div className="mark">◆</div>
          One Dollar.<br />One Child.<br />One Future.
        </div>
        <p style={{ maxWidth: '230px' }}>A global movement for education equity — built on trust, compassion, and collective action.</p>
      </div>
      <div>
        <h5>Explore</h5>
        <ul>
          <li><a href="#story">Our Story</a></li>
          <li><a href="#how">How It Works</a></li>
          <li><a href="#impact">Our Impact</a></li>
          <li><a href="#transparency">Transparency</a></li>
          <li><a href="#faq">FAQ</a></li>
        </ul>
      </div>
      <div>
        <h5>Get Involved</h5>
        <ul>
          <li><a href="#">Become a Monthly Supporter</a></li>
          <li><a href="#">Start a Fundraiser</a></li>
          <li><a href="#">Volunteer</a></li>
          <li><a href="#">Corporate Partnerships</a></li>
        </ul>
      </div>
      <div>
        <h5>Resources</h5>
        <ul>
          <li><a href="#">Blog</a></li>
          <li><a href="#">News</a></li>
          <li><a href="#">Stories &amp; Case Studies</a></li>
          <li><a href="#">For Schools</a></li>
        </ul>
      </div>
      <div>
        <h5>Contact Us</h5>
        <ul>
          <li>✉ info@onedollaronefuture.org</li>
          <li>📞 +1 (437) 231-5226</li>
          <li>📍 Mississauga, Canada</li>
        </ul>
        <h5 style={{ marginTop: '16px' }}>Stay Updated</h5>
        <div className="newsletter">
          <input type="email" placeholder="Enter your email" />
          <a className="btn btn-green" style={{ padding: '10px 16px' }}>Subscribe</a>
        </div>
        <div className="socials">
          <span>📘</span><span>📸</span><span>💼</span><span>▶️</span>
        </div>
      </div>
    </div>
    <div className="footer-bottom">
      <span>Registered nonprofit / charitable registration in progress</span>
      <span>We are not affiliated with any government agency or entity.</span>
    </div>
  </div>
</footer>


    </>
  );
}
