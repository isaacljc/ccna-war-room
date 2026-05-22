import { useEffect, useMemo, useState } from "react";
import { ccnaData } from "./ccnaData";
import { examQuestions } from "./examQuestions";
import "./App.css";

function makeExam() {
  const hard = examQuestions.filter((q) => q.difficulty === "hard");
  const pool = hard.length >= 30 ? hard : examQuestions;
  return [...pool].sort(() => Math.random() - 0.5).slice(0, 30);
}

function sectionType(title = "") {
  const t = title.toLowerCase();
  if (t.includes("trap") || t.includes("weak") || t.includes("not ready")) return "trap";
  if (t.includes("scenario") || t.includes("real")) return "scenario";
  if (t.includes("flow") || t.includes("process") || t.includes("order") || t.includes("method")) return "flow";
  if (t.includes("memorize") || t.includes("must know") || t.includes("ready")) return "memorize";
  return "concept";
}

function iconFor(type) {
  return {
    concept: "🧠",
    flow: "⚡",
    trap: "⚠️",
    scenario: "🧪",
    memorize: "🎯",
  }[type] || "📘";
}

function parseLesson(text) {
  const lines = text.split("\n").map((x) => x.trim()).filter(Boolean);
  const sections = [];
  let current = { title: "Overview", type: "concept", body: [] };

  lines.forEach((line) => {
    const heading = line.endsWith(":") && line.length < 55;
    if (heading) {
      if (current.body.length) sections.push(current);
      const title = line.replace(":", "");
      current = { title, type: sectionType(title), body: [] };
    } else {
      current.body.push(line);
    }
  });

  if (current.body.length) sections.push(current);
  return sections;
}

function LessonRenderer({ day }) {
  const sections = day.sections || parseLesson(day.lesson || "");

  return (
    <div className="lessonEngine">
      {sections.map((section, i) => (
        <section key={i} className={`lessonBlock ${section.type}`}>
          <div className="lessonBlockTop">
            <span>{section.icon || iconFor(section.type)}</span>
            <h3>{section.title}</h3>
          </div>

          {(section.body || []).map((line, idx) => {
            const isList = line.startsWith("-") || /^\d+\./.test(line);
            if (isList) return <div key={idx} className="lessonBullet">{line}</div>;
            return <p key={idx}>{line}</p>;
          })}

          {section.steps && (
            <div className="stepGrid">
              {section.steps.map((s, idx) => (
                <div className="stepCard" key={idx}>
                  <b>{idx + 1}</b>
                  <div>
                    <strong>{s.title}</strong>
                    <p>{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
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

function Dashboard({ completed, percent, selected, goToDay, done }) {
  return (
    <div className="dashboard">
      <div className="dashHero">
        <span className="badge">CCNA COMMAND CENTER</span>
        <h1>🚀 Continue your certification mission</h1>
        <p>Progress, labs, commands, quizzes, flashcards, and final exam training.</p>
      </div>

      <div className="dashGrid">
        <div className="dashCard big">
          <h3>Next Mission</h3>
          <p>Continue where you left off.</p>
          <button className="primary" onClick={() => goToDay(selected)}>
            Continue Day {selected}
          </button>
        </div>

        <div className="dashCard">
          <h3>Progress</h3>
          <div className="dashStat">{completed}/30</div>
          <div className="progressBar"><div style={{ width: `${percent}%` }} /></div>
        </div>

        <div className="dashCard">
          <h3>Readiness</h3>
          <div className="dashStat">{Math.min(99, percent + 10)}%</div>
          <p className="muted">Estimated training readiness.</p>
        </div>

        <div className="dashCard big">
          <h3>Quick Jump</h3>
          <div className="dayGrid">
            {Array.from({ length: 30 }).map((_, i) => {
              const d = i + 1;
              return (
                <button key={d} className={`dayMini ${done[d] ? "done" : ""}`} onClick={() => goToDay(d)}>
                  {done[d] ? "✓" : d}
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
  const [view, setView] = useState("dashboard");
  const [selected, setSelected] = useState(1);
  const [tab, setTab] = useState("lesson");
  const [search, setSearch] = useState("");
  const [done, setDone] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ccnaDone")) || {};
    } catch {
      return {};
    }
  });
  const [examSet, setExamSet] = useState(() => makeExam());
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [started, setStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(1800);

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

  function goToDay(day) {
    setSelected(day);
    setTab("lesson");
    setView("lesson");
  }

  function markComplete() {
    setDone({ ...done, [today.day]: true });
  }

  function formatTime(sec) {
    return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
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
          <p>30-day guided training system for CCNA fundamentals, labs, and exam prep.</p>
        </div>

        <div className="heroStats">
          <div><b>{completed}/30</b><span>Days done</span></div>
          <div><b>{percent}%</b><span>Progress</span></div>
        </div>
      </header>

      <section className="progressWrap">
        <div className="progressFill" style={{ width: `${percent}%` }} />
      </section>

      <div className="shell">
        <aside className="sidebar">
          <input
            className="search"
            placeholder="Search VLAN, OSPF, NAT, subnetting..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="dayList">
            <button className={`dayBtn ${view === "dashboard" ? "active" : ""}`} onClick={() => setView("dashboard")}>
              <span>🚀</span>
              <div><b>Dashboard</b><small>Command Center</small></div>
            </button>

            {filteredDays.map((d) => (
              <button key={d.day} className={`dayBtn ${selected === d.day && view === "lesson" ? "active" : ""}`} onClick={() => goToDay(d.day)}>
                <span>{done[d.day] ? "✅" : "⬜"}</span>
                <div><b>Day {d.day}</b><small>{d.title}</small></div>
              </button>
            ))}
          </div>
        </aside>

        <main className="panel">
          {view === "dashboard" ? (
            <Dashboard completed={completed} percent={percent} selected={selected} goToDay={goToDay} done={done} />
          ) : (
            <>
              <div className="panelTop">
                <div>
                  <span className="badge">DAY {today.day}</span>
                  <h2>{today.title}</h2>
                </div>

                <div className="actions">
                  <button className="ghost" onClick={() => setView("dashboard")}>← Dashboard</button>
                  <button className="complete" onClick={markComplete}>Complete Day</button>
                </div>
              </div>

              <nav className="tabs">
                {tabs.map((t) => (
                  <button key={t} className={tab === t ? "tab activeTab" : "tab"} onClick={() => setTab(t)}>
                    {t.toUpperCase()}
                  </button>
                ))}
              </nav>

              <section className="contentCard">
                {tab === "lesson" && <LessonRenderer day={today} />}

                {tab === "commands" &&
                  (today.commands.length ? today.commands.map((c, i) => <CommandLine key={i} command={c} />) : <p>No commands today.</p>)}

                {tab === "lab" && <ol className="list">{today.lab.map((x, i) => <li key={i}>{x}</li>)}</ol>}

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

                {tab === "exam" && (
                  <div>
                    <div className="examHeader">
                      <h2>🔥 Final Exam Simulator</h2>
                      <h2 className={timeLeft <= 300 ? "timer danger" : "timer"}>{formatTime(timeLeft)}</h2>
                    </div>

                    <p className="muted">30 randomized hard questions · 30 minutes · pass mark 85%</p>

                    <div className="examActions">
                      {!started && <button className="primary" onClick={() => setStarted(true)}>Start Exam</button>}
                      <button className="ghost" onClick={newExam}>New Random Exam</button>
                    </div>

                    {started && examSet.map((q, i) => (
                      <div className="questionCard" key={i}>
                        <b>Q{i + 1}. {q.question}</b>
                        {q.options.map((opt) => (
                          <label className="option" key={opt}>
                            <input
                              type="radio"
                              disabled={submitted}
                              checked={answers[i] === opt}
                              onChange={() => setAnswers({ ...answers, [i]: opt })}
                            />
                            {opt}
                          </label>
                        ))}

                        {submitted && (
                          <div className={answers[i] === q.answer ? "correct" : "wrong"}>
                            Correct: <b>{q.answer}</b><br />
                            {q.explanation}
                          </div>
                        )}
                      </div>
                    ))}

                    {started && !submitted && <button className="primary full" onClick={() => setSubmitted(true)}>Submit Exam</button>}

                    {submitted && (
                      <div className="result">
                        <h2>Score: {score}/{examSet.length} — {Math.round((score / examSet.length) * 100)}%</h2>
                        <h1 className={score / examSet.length >= 0.85 ? "pass" : "fail"}>
                          {score / examSet.length >= 0.85 ? "✅ PASS" : "❌ FAIL"}
                        </h1>
                      </div>
                    )}
                  </div>
                )}
              </section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}