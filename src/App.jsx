import { useEffect, useMemo, useState } from "react";
import { ccnaData } from "./ccnaData";
import { examQuestions } from "./examQuestions";
import "./App.css";

function makeExam() {
  const hard = examQuestions.filter((q) => q.difficulty === "hard");
  return [...(hard.length >= 30 ? hard : examQuestions)]
    .sort(() => Math.random() - 0.5)
    .slice(0, 30);
}

function PremiumLesson({ text }) {
  const lines = text.split("\n").map((x) => x.trim()).filter(Boolean);

  const sections = [];
  let current = null;

  lines.forEach((line) => {
    const isHeading = line.endsWith(":") && line.length < 45;

    if (isHeading) {
      current = {
        title: line.replace(":", ""),
        body: [],
      };
      sections.push(current);
    } else if (current) {
      current.body.push(line);
    } else {
      sections.push({
        title: "Overview",
        body: [line],
      });
    }
  });

  return (
    <div className="premiumLesson">
      {sections.map((section, i) => (
        <details key={i} className="lessonSection" open={i === 0}>
          <summary>
            <span>{section.title}</span>
            <b>▼</b>
          </summary>

          <div className="lessonBody">
            {section.body.map((line, idx) => {
              const isPoint = line.startsWith("-") || /^\d+\./.test(line);
              const isArrow = line === "↓";

              if (isArrow) return <div key={idx} className="flowArrow">↓</div>;

              if (isPoint) {
                return (
                  <div key={idx} className="lessonPoint">
                    {line}
                  </div>
                );
              }

              return <p key={idx}>{line}</p>;
            })}
          </div>
        </details>
      ))}
    </div>
  );
}
function CommandLine({ command }) {
  const [cmd, note] = command.split("//");
  return (
    <div className="codeLine">
      <code>{cmd.trim()}</code>
      {note && <span>{note.trim()}</span>}
    </div>
  );
}

function EncapsulationFlow() {
  const layers = [
    { name: "Application", desc: "User data (HTTP, DNS, etc)" },
    { name: "Transport", desc: "TCP/UDP segment (ports, reliability)" },
    { name: "Network", desc: "IP packet (routing decision)" },
    { name: "Data Link", desc: "Ethernet frame (MAC addressing)" },
    { name: "Physical", desc: "Bits on wire (signals)" }
  ];

  return (
    <div className="flowWrap">
      {layers.map((l, i) => (
        <div key={i} className="flowBlock">
          <div className="flowTitle">{l.name}</div>
          <div className="flowDesc">{l.desc}</div>
          {i !== layers.length - 1 && <div className="flowConnector">↓</div>}
        </div>
      ))}
    </div>
  );
}

function OSIGrid() {
  const osi = [
    ["7 Application", "HTTP, HTTPS, DNS, DHCP, SSH"],
    ["6 Presentation", "Encryption, formatting"],
    ["5 Session", "Session management"],
    ["4 Transport", "TCP / UDP"],
    ["3 Network", "IP addressing, routing"],
    ["2 Data Link", "MAC addresses, switching"],
    ["1 Physical", "Cables, signals, wireless"]
  ];

  return (
    <div className="osiGrid">
      {osi.map((x) => (
        <div className="osiCard" key={x[0]}>
          <b>{x[0]}</b>
          <span>{x[1]}</span>
        </div>
      ))}
    </div>
  );
}
function Dashboard({ completed, percent, selected, setSelected, setView, done }) {
  return (
    <div className="dashboard">

      <div className="dashHero">
        <h1>🚀 CCNA Command Center</h1>
        <p>Track progress. Continue your mission. Become exam-ready.</p>
      </div>

      <div className="dashGrid">

        <div className="dashCard big">
          <h3>Continue Training</h3>
          <p>Jump back into your next mission.</p>

          <button
            className="primary"
            onClick={() => setView("lesson")}
          >
            Continue Day {selected}
          </button>
        </div>

        <div className="dashCard">
          <h3>Progress</h3>
          <div className="dashStat">{completed}/30 Days</div>
          <div className="progressBar">
            <div style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="dashCard">
          <h3>Completion</h3>
          <div className="dashStat">{percent}%</div>
          <p className="muted">Keep going. Momentum matters.</p>
        </div>

        <div className="dashCard">
          <h3>Quick Jump</h3>

          <div className="dayGrid">
            {Array.from({ length: 30 }).map((_, i) => {
              const d = i + 1;
              return (
                <button
                  key={d}
                  className={`dayMini ${selected === d ? "active" : ""}`}
                  onClick={() => {
                    setSelected(d);
                    setView("lesson");
                  }}
                >
                  {done[d] ? "✅" : d}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState("dashboard"); // "dashboard" or "lesson"
  const [selected, setSelected] = useState(1);
  const [tab, setTab] = useState("lesson");
  const [search, setSearch] = useState("");
  const [done, setDone] = useState(() => JSON.parse(localStorage.getItem("ccnaDone")) || {});
  const [examSet, setExamSet] = useState(() => makeExam());
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [focus, setFocus] = useState(false);

  const today = ccnaData.find((d) => d.day === selected) || ccnaData[0];
  const completed = Object.keys(done).length;
  const percent = Math.round((completed / ccnaData.length) * 100);

  const filteredDays = ccnaData.filter((d) =>
    `${d.day} ${d.title} ${d.lesson}`.toLowerCase().includes(search.toLowerCase())
  );

  const score = useMemo(
    () => examSet.reduce((t, q, i) => t + (answers[i] === q.answer ? 1 : 0), 0),
    [answers, examSet]
  );

  useEffect(() => {
    localStorage.setItem("ccnaDone", JSON.stringify(done));
  }, [done]);

  useEffect(() => {
    if (!started || submitted) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setSubmitted(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [started, submitted]);

  function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function newExam() {
    setExamSet(makeExam());
    setAnswers({});
    setSubmitted(false);
    setStarted(true);
    setTimeLeft(1800);
  }

  const tabs = ["lesson", "commands", "lab", "quiz", "flashcards", ...(selected === 30 ? ["exam"] : [])];

  return (
    <div className="app">
      <div className="bgGlow" />

      <header className="hero">
        <div>
          <div className="eyebrow">CCNA 200-301 TRAINING SYSTEM</div>
          <h1>⚡ CCNA War Room</h1>
          <p>30-day battle plan · labs · commands · flashcards · final exam simulator</p>
        </div>

        <div className="heroStats">
          <div><b>{completed}/30</b><span>Days done</span></div>
          <div><b>{percent}%</b><span>Progress</span></div>
        </div>
      </header>

      <section className="progressWrap">
        <div className="progressFill" style={{ width: `${percent}%` }} />
      </section>

      <div className={`shell ${focus ? "focus" : ""}`}>
        {!focus && (
          <aside className="sidebar">
            <input
              className="search"
              placeholder="Search VLAN, OSPF, NAT, subnetting..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="dayList">
              {filteredDays.map((d) => (
                <button
                  key={d.day}
                  className={`dayBtn ${selected === d.day ? "active" : ""}`}
                  onClick={() => {
                    setSelected(d.day);
                    setTab("lesson");
                  }}
                >
                  <span>{done[d.day] ? "✅" : "⬜"}</span>
                  <div>
                    <b>Day {d.day}</b>
                    <small>{d.title}</small>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        )}

<main className="panel">

  {view === "dashboard" && (
    <Dashboard
      completed={completed}
      percent={percent}
      selected={selected}
      setSelected={setSelected}
      setView={setView}
      done={done}
    />
  )}

  {view === "lesson" && (
    <>
      <div className="panelTop">
        <div>
          <span className="badge">DAY {today.day}</span>
          <h2>{today.title}</h2>
        </div>

        <div className="actions">
          <button className="ghost" onClick={() => setView("dashboard")}>
            ← Dashboard
          </button>

          <button className="complete" onClick={() => setDone({ ...done, [today.day]: true })}>
            Complete Day
          </button>
        </div>
      </div>

      <nav className="tabs">
        {tabs.map((t) => (
          <button
            key={t}
            className={tab === t ? "tab activeTab" : "tab"}
            onClick={() => setTab(t)}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </nav>

      <section className="contentCard">
        {tab === "lesson" && (
          <>
            <PremiumLesson text={today.lesson} />
            {today.day === 1 && (
              <>
                <h3 className="sectionTitle">Encapsulation Flow</h3>
                <EncapsulationFlow />
              </>
            )}
          </>
        )}

        {tab === "commands" &&
          (today.commands.length
            ? today.commands.map((c, i) => <CommandLine key={i} command={c} />)
            : <p>No commands today.</p>)}

        {tab === "lab" && (
          <ol className="list">
            {today.lab.map((x, i) => <li key={i}>{x}</li>)}
          </ol>
        )}

        {tab === "quiz" &&
          today.quiz.map((q, i) => (
            <details className="miniCard" key={i}>
              <summary>{q.q}</summary>
              <p>{q.a}</p>
            </details>
          ))}

        {tab === "flashcards" &&
          today.flashcards.map((f, i) => (
            <details className="miniCard" key={i}>
              <summary>{f.front}</summary>
              <p>{f.back}</p>
            </details>
          ))}
      </section>
    </>
  )}

</main>
   </div>
  </div>
 );
}