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
          .wrap{max-width:1180px;margin:0 auto;padding:0 24px;}
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
        
          /* HEADER */
          header{
            display:flex;align-items:center;justify-content:space-between;
            padding:16px 24px;border-bottom:1px solid var(--line);
            position:sticky;top:0;background:#fff;z-index:50;
          }
          .brand{display:flex;align-items:center;gap:10px;font-family:Georgia,serif;font-weight:700;font-size:1rem;color:var(--navy);}
          .brand .mark{
            width:36px;height:36px;border-radius:8px;
            background:var(--navy);color:var(--gold);
            display:flex;align-items:center;justify-content:center;font-size:1.2rem;
          }
          nav{display:flex;gap:28px;font-size:0.92rem;font-weight:500;color:var(--ink);}
          nav a{opacity:0.85;}
          nav a.active{color:var(--green);opacity:1;border-bottom:2px solid var(--green);padding-bottom:6px;}
          .header-cta{white-space:nowrap;}
        
          /* HERO */
          .hero{
            background:linear-gradient(180deg,var(--navy) 0%, var(--navy-dark) 100%);
            color:#fff; position:relative; overflow:hidden;
          }
          .hero-inner{
            display:grid;grid-template-columns:1fr 1fr;gap:40px;align-items:center;
            padding:64px 24px 48px;
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
            position:absolute;bottom:-28px;right:24px;background:#fff;color:var(--ink);
            border-radius:12px;padding:16px 18px;box-shadow:0 12px 30px rgba(0,0,0,0.18);
            max-width:230px;font-size:0.85rem;
          }
          .hero-badge .icon{color:var(--green);font-size:1.3rem;margin-bottom:6px;}
          .hero-badge b{display:block;color:var(--green);}
        
          .trust-strip{
            display:flex;flex-wrap:wrap;gap:24px;justify-content:center;
            padding:18px 24px;border-top:1px solid rgba(255,255,255,0.12);
            font-size:0.82rem;color:#c6d0dc;
          }
          .trust-strip span{display:flex;align-items:center;gap:8px;}
        
          /* STATS */
          .stats{
            display:grid;grid-template-columns:repeat(5,1fr);
            background:var(--bg-soft);border-bottom:1px solid var(--line);
          }
          .stat{
            padding:30px 16px;text-align:center;border-right:1px solid var(--line);
          }
          .stat:last-child{border-right:none;}
          .stat .num{font-size:1.7rem;font-weight:700;color:var(--navy);font-family:Georgia,serif;}
          .stat .lbl{font-size:0.8rem;color:var(--muted);margin-top:2px;}
        
          /* SECTION HEADS */
          section{padding:64px 0;}
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
          .item{text-align:center;font-size:0.78rem;color:var(--muted);}
          .item .ic{font-size:1.5rem;display:block;margin-bottom:6px;}
          .panel.good .item .ic{color:var(--green);}
          .panel.bad .item .ic{color:var(--red);}
          .item b{display:block;color:var(--ink);font-size:0.82rem;margin-bottom:2px;}
          .panel-photo{
            height:120px;border-radius:8px;margin-top:6px;
            display:flex;align-items:center;justify-content:center;font-size:2.2rem;
          }
          .panel.good .panel-photo{background:linear-gradient(135deg,#dff3e6,#c6e9d3);color:var(--green-dark);}
          .panel.bad .panel-photo{background:linear-gradient(135deg,#f6dcd6,#f0c7bd);color:var(--red);}
        
          .callout{
            margin-top:28px;display:flex;align-items:center;gap:12px;
            background:#fff8e6;border:1px solid #f3dfa1;border-radius:10px;
            padding:18px 22px;font-size:0.92rem;color:#6b5313;justify-content:center;text-align:center;
          }
        
          /* WHAT $1 HELPS */
          .flow{display:flex;align-items:center;gap:8px;flex-wrap:wrap;justify-content:center;}
          .flow-card{
            flex:1;min-width:150px;text-align:center;background:var(--bg-soft);
            border-radius:10px;padding:20px 12px;border:1px solid var(--line);
          }
          .flow-card .ic{font-size:1.8rem;margin-bottom:8px;color:var(--navy);}
          .flow-card h4{font-size:0.9rem;margin-bottom:4px;}
          .flow-card p{font-size:0.76rem;color:var(--muted);margin:0;}
          .arrow{color:var(--muted);font-size:1.2rem;}
        
          /* HOW IT WORKS */
          .steps{display:flex;gap:8px;justify-content:space-between;flex-wrap:wrap;}
          .step{flex:1;min-width:150px;text-align:center;position:relative;padding:0 8px;}
          .step .num{
            width:34px;height:34px;border-radius:50%;background:var(--navy);color:#fff;
            display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-weight:700;font-size:0.9rem;
          }
          .step:nth-child(3) .num{background:var(--gold);color:var(--navy-dark);}
          .step .ic{font-size:1.6rem;margin-bottom:8px;color:var(--navy);}
          .step h4{font-size:0.9rem;margin-bottom:4px;}
          .step p{font-size:0.76rem;color:var(--muted);}
        
          /* FOUNDER + TRANSPARENCY */
          .two-col{display:grid;grid-template-columns:1fr 1fr;gap:24px;}
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
          .story-card{border:1px solid var(--line);border-radius:12px;overflow:hidden;}
          .story-photo{
            height:150px;display:flex;align-items:center;justify-content:center;font-size:2.4rem;
            background:linear-gradient(135deg,#eef2f7,#dde5ee);color:var(--navy);
          }
          .story-body{padding:16px;}
          .story-body h4{font-size:0.95rem;margin-bottom:4px;}
          .story-body p{font-size:0.8rem;color:var(--muted);margin:0 0 8px;}
          .story-body a{font-size:0.8rem;color:var(--green-dark);font-weight:600;}
        
          /* CTA BANNER */
          .cta-banner{
            background:var(--navy-dark);color:#fff;border-radius:14px;
            padding:36px;display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;
          }
          .cta-banner h3{font-size:1.4rem;margin-bottom:6px;}
          .cta-banner p{color:#c6d0dc;font-size:0.9rem;margin:0;}
        
          /* WAYS TO GIVE */
          .give-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;}
          .give-card{
            border:1px solid var(--line);border-radius:12px;padding:22px;text-align:center;
          }
          .give-card .ic{font-size:1.6rem;color:var(--green);margin-bottom:8px;}
          .give-card h4{font-size:1rem;margin-bottom:2px;}
          .give-card p{font-size:0.78rem;color:var(--muted);margin-bottom:16px;}
          .give-card .btn{width:100%;justify-content:center;}
        
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
            .hero-inner{grid-template-columns:1fr;}
            .stats{grid-template-columns:repeat(3,1fr);}
            .stat:nth-child(3){border-right:none;}
            .compare,.two-col{grid-template-columns:1fr;}
            .item-grid{grid-template-columns:repeat(2,1fr);}
            .stories{grid-template-columns:1fr;}
            .give-grid{grid-template-columns:repeat(2,1fr);}
            .footer-grid{grid-template-columns:repeat(2,1fr);}
            nav{display:none;}
          }
        `
      }} />

      <header>
        <div className="brand">
          <div className="mark">◆</div>
          One Dollar.<br />One Child.<br />One Future.
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
      </header>

      <section className="hero" id="home" style={{ paddingTop: 0 }}>
        <div className="hero-inner wrap">
          <div>
            <h1>One Dollar. One Child.<br /><span className="accent">One Future.</span></h1>
            <p>In countries like Canada, quality public education is a blessing many families can rely on. In many underserved communities, children are not given that same safe start.</p>
            <p>Some children study in damaged, overcrowded government schools with limited materials, irregular teaching, and unsafe conditions. Your $1 a day, shared with others, helps move carefully selected children from low-income families into affordable, quality private schools where they can learn safely, consistently, and with dignity.</p>
            <div className="hero-actions">
              <a className="btn btn-green">♥ Give $1 a Day</a>
              <a className="btn btn-outline">▶ See How It Works</a>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <div className="hero-visual"><span className="glyph">🎒</span></div>
            <div className="hero-badge">
              <div className="icon">♥</div>
              Small gift. Shared by many. <b>Life-changing opportunity.</b>
            </div>
          </div>
        </div>
        <div className="trust-strip wrap">
          <span>🤝 Pooled Donations</span>
          <span>🏫 Vetted Private Schools</span>
          <span>🛡 Child Safeguarding</span>
          <span>📊 6-Month Progress Reports</span>
          <span>🔎 Transparent Reporting</span>
        </div>
      </section>

      <div className="stats wrap" style={{ maxWidth: 'none' }}>
        <div className="stat"><div className="num">100</div><div className="lbl">Children Supported</div></div>
        <div className="stat"><div className="num">10</div><div className="lbl">Partner Schools</div></div>
        <div className="stat"><div className="num">10,000</div><div className="lbl">Books &amp; Learning Materials</div></div>
        <div className="stat"><div className="num">1,000</div><div className="lbl">Monthly Supporters</div></div>
        <div className="stat"><div className="num">6-Month</div><div className="lbl">Reporting</div></div>
      </div>

      <section id="impact">
        <div className="wrap">
          <h2 className="section-title">Why This Help Is Needed</h2>
          <div className="compare">
            <div className="panel good">
              <h3>🇨🇦 What many families in Canada take for granted</h3>
              <div className="item-grid">
                <div className="item"><span className="ic">📚</span><b>Safe Classrooms</b>Clean, well-built learning spaces</div>
                <div className="item"><span className="ic">👩‍🏫</span><b>Regular Teachers</b>Qualified teachers who show up</div>
                <div className="item"><span className="ic">📖</span><b>School Libraries</b>Access to books and technology</div>
                <div className="item"><span className="ic">🚌</span><b>Good Infrastructure</b>Proper sanitation, water, and facilities</div>
              </div>
              <div className="panel-photo">🏫</div>
            </div>
            <div className="panel bad">
              <h3>🌍 What many children still face in underserved communities</h3>
              <div className="item-grid">
                <div className="item"><span className="ic">🏚</span><b>Damaged Buildings</b>Cracked walls, leaky roofs, unsafe spaces</div>
                <div className="item"><span className="ic">👥</span><b>Overcrowded Classes</b>Too many students, not enough space</div>
                <div className="item"><span className="ic">📕</span><b>Few Books &amp; Materials</b>Limited or no books, no stationery</div>
                <div className="item"><span className="ic">🧑‍🏫</span><b>Irregular Teaching</b>Teachers often absent or overburdened</div>
              </div>
              <div className="panel-photo">🏚</div>
            </div>
          </div>
          <div className="callout">
            ❤️ Your support helps close this gap by moving children into affordable, quality private schools where they can learn with dignity and consistency.
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-soft)' }}>
        <div className="wrap">
          <h2 className="section-title">What Your $1 Helps Make Possible</h2>
          <div className="flow">
            <div className="flow-card"><div className="ic">🏫</div><h4>School Fees</h4><p>Keeps a child enrolled in a quality school</p></div>
            <div className="arrow">→</div>
            <div className="flow-card"><div className="ic">📘</div><h4>Books</h4><p>Gives access to learning materials</p></div>
            <div className="arrow">→</div>
            <div className="flow-card"><div className="ic">👕</div><h4>Uniforms</h4><p>Builds confidence and equality</p></div>
            <div className="arrow">→</div>
            <div className="flow-card"><div className="ic">✏️</div><h4>Stationery</h4><p>Supports daily classroom learning</p></div>
            <div className="arrow">→</div>
            <div className="flow-card"><div className="ic">🛡</div><h4>Safer Classrooms</h4><p>Cleaner, safer learning spaces</p></div>
            <div className="arrow">→</div>
            <div className="flow-card"><div className="ic">🎓</div><h4>Regular Learning</h4><p>Consistent teaching. Better futures.</p></div>
          </div>
        </div>
      </section>

      <section id="how">
        <div className="wrap">
          <h2 className="section-title">How It Works</h2>
          <div className="steps">
            <div className="step"><div className="num">1</div><div className="ic">🔍</div><h4>Need Identified</h4><p>We work with trusted partners to identify needy children.</p></div>
            <div className="step"><div className="num">2</div><div className="ic">🏫</div><h4>School Selected</h4><p>Schools are carefully vetted for quality, safety, and values.</p></div>
            <div className="step"><div className="num">3</div><div className="ic">🧒</div><h4>Child Enrolled</h4><p>We enroll children, pay school fees, and provide basics.</p></div>
            <div className="step"><div className="num">4</div><div className="ic">📖</div><h4>Child Learns</h4><p>Children attend school regularly and receive consistent support.</p></div>
            <div className="step"><div className="num">5</div><div className="ic">📄</div><h4>Progress Shared</h4><p>We share a progress report every 6 months with you.</p></div>
          </div>
        </div>
      </section>

      <section id="story" style={{ background: 'var(--bg-soft)' }}>
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

          <div className="card" id="transparency">
            <h3 style={{ marginBottom: '16px', color: 'var(--navy)', fontSize: '1.05rem' }}>Our Commitment to Transparency</h3>
            <ul className="checklist">
              <li><span className="tick">✓</span>Needy families carefully screened</li>
              <li><span className="tick">✓</span>Private schools vetted for quality and safety</li>
              <li><span className="tick">✓</span>Donations pooled for verified education support</li>
              <li><span className="tick">✓</span>Child stories shared only with proper consent</li>
              <li><span className="tick">✓</span>Progress reports every 6 months</li>
              <li><span className="tick">✓</span>Clear financial reporting</li>
            </ul>
          </div>
        </div>

        <div className="wrap" style={{ marginTop: '24px' }}>
          <div className="card">
            <h3 style={{ marginBottom: '6px', color: 'var(--navy)', fontSize: '1.05rem' }}>What Your Donation Supports</h3>
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
      </section>

      <section>
        <div className="wrap">
          <h2 className="section-title">Real Potential. Better Futures.</h2>
          <div className="stories">
            <div className="story-card">
              <div className="story-photo">👧</div>
              <div className="story-body">
                <h4>Amina, 11</h4>
                <p>Dreams of becoming a doctor.</p>
                <a href="#">Read Amina's story →</a>
              </div>
            </div>
            <div className="story-card">
              <div className="story-photo">👦</div>
              <div className="story-body">
                <h4>Rahul, 12</h4>
                <p>Loves building things and wants to be an engineer.</p>
                <a href="#">Read Rahul's story →</a>
              </div>
            </div>
            <div className="story-card">
              <div className="story-photo">👧</div>
              <div className="story-body">
                <h4>Fatima, 9</h4>
                <p>Enjoys reading and hopes to teach one day.</p>
                <a href="#">Read Fatima's story →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: 'var(--bg-soft)' }} id="involved">
        <div className="wrap">
          <div className="cta-banner">
            <div>
              <h3>Your dollar today. Their future tomorrow.</h3>
              <p>Together, we can build a world where every child can learn, grow, and dream.</p>
            </div>
            <a className="btn btn-gold">Start Giving</a>
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <h2 className="section-title">Ways to Give</h2>
          <div className="give-grid">
            <div className="give-card">
              <div className="ic">♥</div>
              <h4>$1 A Day</h4>
              <p>Small amount. Big change.</p>
              <a className="btn btn-green">Give $1 a Day</a>
            </div>
            <div className="give-card">
              <div className="ic">📅</div>
              <h4>$30 / Month</h4>
              <p>Consistent support creates real change.</p>
              <a className="btn btn-outline">Give Monthly</a>
            </div>
            <div className="give-card">
              <div className="ic">🎁</div>
              <h4>$365 / Year</h4>
              <p>Make a year of learning possible.</p>
              <a className="btn btn-outline">Give Annually</a>
            </div>
            <div className="give-card">
              <div className="ic">🤲</div>
              <h4>Custom Gift</h4>
              <p>Give any amount that works for you.</p>
              <a className="btn btn-outline">Give Now</a>
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
