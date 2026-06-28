import { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, onSnapshot, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCX_Zu70ralxfBJW6Oj6_ZjjmHSXzvbgD8",
  authDomain: "wc2026-d0f64.firebaseapp.com",
  projectId: "wc2026-d0f64",
  storageBucket: "wc2026-d0f64.firebasestorage.app",
  messagingSenderId: "432662443245",
  appId: "1:432662443245:web:35ca127ebc6d4e5abfc8e4",
};

const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
const DOC_REF = doc(db, "predictions", "matches");

const PLAYERS = [
  { key: "alan",  name: "Alan",  color: "#38bdf8" },
  { key: "julia", name: "Julia", color: "#f472b6" },
  { key: "niels", name: "Niels", color: "#a3e635" },
];

const GROUPS = {
  A: ["Mexico", "South Africa", "South Korea", "Czechia"],
  B: ["Canada", "Bosnia", "Qatar", "Switzerland"],
  C: ["Brazil", "Morocco", "Haiti", "Scotland"],
  D: ["USA", "Paraguay", "Australia", "Türkiye"],
  E: ["Germany", "Curaçao", "Ivory Coast", "Ecuador"],
  F: ["Netherlands", "Japan", "Sweden", "Tunisia"],
  G: ["Belgium", "Egypt", "Iran", "New Zealand"],
  H: ["Spain", "Cape Verde", "Saudi Arabia", "Uruguay"],
  I: ["France", "Senegal", "Iraq", "Norway"],
  J: ["Argentina", "Algeria", "Austria", "Jordan"],
  K: ["Portugal", "DR Congo", "Uzbekistan", "Colombia"],
  L: ["England", "Croatia", "Ghana", "Panama"],
};

const MATCHES = [
  { id: 1,  group: "A", date: "Jun 11", home: "Mexico",      away: "South Africa" },
  { id: 2,  group: "A", date: "Jun 11", home: "South Korea", away: "Czechia" },
  { id: 3,  group: "A", date: "Jun 18", home: "Czechia",     away: "South Africa" },
  { id: 4,  group: "A", date: "Jun 18", home: "Mexico",      away: "South Korea" },
  { id: 5,  group: "A", date: "Jun 24", home: "Czechia",     away: "Mexico" },
  { id: 6,  group: "A", date: "Jun 24", home: "South Africa",away: "South Korea" },
  { id: 7,  group: "B", date: "Jun 12", home: "Canada",      away: "Bosnia" },
  { id: 8,  group: "B", date: "Jun 13", home: "Qatar",       away: "Switzerland" },
  { id: 9,  group: "B", date: "Jun 18", home: "Switzerland", away: "Bosnia" },
  { id: 10, group: "B", date: "Jun 18", home: "Canada",      away: "Qatar" },
  { id: 11, group: "B", date: "Jun 24", home: "Switzerland", away: "Canada" },
  { id: 12, group: "B", date: "Jun 24", home: "Bosnia",      away: "Qatar" },
  { id: 13, group: "C", date: "Jun 13", home: "Brazil",      away: "Morocco" },
  { id: 14, group: "C", date: "Jun 13", home: "Haiti",       away: "Scotland" },
  { id: 15, group: "C", date: "Jun 19", home: "Scotland",    away: "Morocco" },
  { id: 16, group: "C", date: "Jun 19", home: "Brazil",      away: "Haiti" },
  { id: 17, group: "C", date: "Jun 24", home: "Scotland",    away: "Brazil" },
  { id: 18, group: "C", date: "Jun 24", home: "Morocco",     away: "Haiti" },
  { id: 19, group: "D", date: "Jun 12", home: "USA",         away: "Paraguay" },
  { id: 20, group: "D", date: "Jun 13", home: "Australia",   away: "Türkiye" },
  { id: 21, group: "D", date: "Jun 19", home: "USA",         away: "Australia" },
  { id: 22, group: "D", date: "Jun 19", home: "Türkiye",     away: "Paraguay" },
  { id: 23, group: "D", date: "Jun 25", home: "Türkiye",     away: "USA" },
  { id: 24, group: "D", date: "Jun 25", home: "Paraguay",    away: "Australia" },
  { id: 25, group: "E", date: "Jun 14", home: "Germany",     away: "Curaçao" },
  { id: 26, group: "E", date: "Jun 14", home: "Ivory Coast", away: "Ecuador" },
  { id: 27, group: "E", date: "Jun 20", home: "Germany",     away: "Ivory Coast" },
  { id: 28, group: "E", date: "Jun 20", home: "Ecuador",     away: "Curaçao" },
  { id: 29, group: "E", date: "Jun 25", home: "Ecuador",     away: "Germany" },
  { id: 30, group: "E", date: "Jun 25", home: "Curaçao",     away: "Ivory Coast" },
  { id: 31, group: "F", date: "Jun 14", home: "Netherlands", away: "Japan" },
  { id: 32, group: "F", date: "Jun 14", home: "Sweden",      away: "Tunisia" },
  { id: 33, group: "F", date: "Jun 20", home: "Netherlands", away: "Sweden" },
  { id: 34, group: "F", date: "Jun 20", home: "Tunisia",     away: "Japan" },
  { id: 35, group: "F", date: "Jun 25", home: "Japan",       away: "Sweden" },
  { id: 36, group: "F", date: "Jun 25", home: "Tunisia",     away: "Netherlands" },
  { id: 37, group: "G", date: "Jun 15", home: "Belgium",     away: "Egypt" },
  { id: 38, group: "G", date: "Jun 15", home: "Iran",        away: "New Zealand" },
  { id: 39, group: "G", date: "Jun 21", home: "Belgium",     away: "Iran" },
  { id: 40, group: "G", date: "Jun 21", home: "New Zealand", away: "Egypt" },
  { id: 41, group: "G", date: "Jun 27", home: "Belgium",     away: "New Zealand" },
  { id: 42, group: "G", date: "Jun 27", home: "Egypt",       away: "Iran" },
  { id: 43, group: "H", date: "Jun 15", home: "Spain",       away: "Cape Verde" },
  { id: 44, group: "H", date: "Jun 15", home: "Saudi Arabia",away: "Uruguay" },
  { id: 45, group: "H", date: "Jun 21", home: "Spain",       away: "Saudi Arabia" },
  { id: 46, group: "H", date: "Jun 21", home: "Uruguay",     away: "Cape Verde" },
  { id: 47, group: "H", date: "Jun 26", home: "Cape Verde",  away: "Saudi Arabia" },
  { id: 48, group: "H", date: "Jun 26", home: "Uruguay",     away: "Spain" },
  { id: 49, group: "I", date: "Jun 16", home: "France",      away: "Senegal" },
  { id: 50, group: "I", date: "Jun 16", home: "Iraq",        away: "Norway" },
  { id: 51, group: "I", date: "Jun 22", home: "France",      away: "Iraq" },
  { id: 52, group: "I", date: "Jun 22", home: "Norway",      away: "Senegal" },
  { id: 53, group: "I", date: "Jun 26", home: "Norway",      away: "France" },
  { id: 54, group: "I", date: "Jun 26", home: "Senegal",     away: "Iraq" },
  { id: 55, group: "J", date: "Jun 16", home: "Argentina",   away: "Algeria" },
  { id: 56, group: "J", date: "Jun 16", home: "Austria",     away: "Jordan" },
  { id: 57, group: "J", date: "Jun 22", home: "Argentina",   away: "Austria" },
  { id: 58, group: "J", date: "Jun 22", home: "Jordan",      away: "Algeria" },
  { id: 59, group: "J", date: "Jun 27", home: "Algeria",     away: "Austria" },
  { id: 60, group: "J", date: "Jun 27", home: "Jordan",      away: "Argentina" },
  { id: 61, group: "K", date: "Jun 17", home: "Portugal",    away: "DR Congo" },
  { id: 62, group: "K", date: "Jun 17", home: "Uzbekistan",  away: "Colombia" },
  { id: 63, group: "K", date: "Jun 23", home: "Portugal",    away: "Uzbekistan" },
  { id: 64, group: "K", date: "Jun 23", home: "Colombia",    away: "DR Congo" },
  { id: 65, group: "K", date: "Jun 27", home: "Portugal",    away: "Colombia" },
  { id: 66, group: "K", date: "Jun 27", home: "DR Congo",    away: "Uzbekistan" },
  { id: 67, group: "L", date: "Jun 17", home: "England",     away: "Croatia" },
  { id: 68, group: "L", date: "Jun 17", home: "Ghana",       away: "Panama" },
  { id: 69, group: "L", date: "Jun 23", home: "England",     away: "Ghana" },
  { id: 70, group: "L", date: "Jun 23", home: "Panama",      away: "Croatia" },
  { id: 71, group: "L", date: "Jun 27", home: "England",     away: "Panama" },
  { id: 72, group: "L", date: "Jun 27", home: "Croatia",     away: "Ghana" },
];

const KNOCKOUTS = [
  // Round of 32
  { id: 73, round: "R32", date: "Jun 28", home: "South Africa",  away: "Canada",   city: "Los Angeles" },
  { id: 74, round: "R32", date: "Jun 29", home: "Germany",       away: "Paraguay", city: "Boston" },
  { id: 75, round: "R32", date: "Jun 29", home: "Netherlands",   away: "Morocco",  city: "Monterrey" },
  { id: 76, round: "R32", date: "Jun 29", home: "Brazil",        away: "Japan",    city: "Houston" },
  { id: 77, round: "R32", date: "Jun 30", home: "France",        away: "Sweden",   city: "New York/NJ" },
  { id: 78, round: "R32", date: "Jun 30", home: "Ivory Coast",   away: "Norway",   city: "Dallas" },
  { id: 79, round: "R32", date: "Jun 30", home: "Mexico",        away: "Ecuador",  city: "Mexico City" },
  { id: 80, round: "R32", date: "Jul 1",  home: "England",       away: "DR Congo", city: "Atlanta" },
  { id: 81, round: "R32", date: "Jul 1",  home: "USA",           away: "Bosnia",   city: "San Francisco" },
  { id: 82, round: "R32", date: "Jul 1",  home: "Belgium",       away: "Senegal",  city: "Seattle" },
  { id: 83, round: "R32", date: "Jul 2",  home: "Portugal",      away: "Croatia",  city: "Toronto" },
  { id: 84, round: "R32", date: "Jul 2",  home: "Spain",         away: "Austria",  city: "Los Angeles" },
  { id: 85, round: "R32", date: "Jul 2",  home: "Switzerland",   away: "Algeria",  city: "Vancouver" },
  { id: 86, round: "R32", date: "Jul 3",  home: "Argentina",     away: "Cape Verde", city: "Miami" },
  { id: 87, round: "R32", date: "Jul 3",  home: "Colombia",      away: "Ghana",    city: "Kansas City" },
  { id: 88, round: "R32", date: "Jul 3",  home: "Australia",     away: "Egypt",    city: "Dallas" },
  // Round of 16 - matchups TBD, filled in as R32 results come in
  { id: 89, round: "R16", date: "Jul 4", home: "Winner 74", away: "Winner 77", city: "TBD" },
  { id: 90, round: "R16", date: "Jul 4", home: "Winner 73", away: "Winner 75", city: "TBD" },
  { id: 91, round: "R16", date: "Jul 5", home: "Winner 76", away: "Winner 78", city: "TBD" },
  { id: 92, round: "R16", date: "Jul 5", home: "Winner 79", away: "Winner 80", city: "TBD" },
  { id: 93, round: "R16", date: "Jul 6", home: "Winner 83", away: "Winner 84", city: "TBD" },
  { id: 94, round: "R16", date: "Jul 6", home: "Winner 81", away: "Winner 82", city: "TBD" },
  { id: 95, round: "R16", date: "Jul 7", home: "Winner 86", away: "Winner 88", city: "TBD" },
  { id: 96, round: "R16", date: "Jul 7", home: "Winner 85", away: "Winner 87", city: "TBD" },
  // Quarter-finals
  { id: 97,  round: "QF", date: "Jul 9",  home: "Winner 89", away: "Winner 90", city: "TBD" },
  { id: 98,  round: "QF", date: "Jul 10", home: "Winner 93", away: "Winner 94", city: "TBD" },
  { id: 99,  round: "QF", date: "Jul 10", home: "Winner 91", away: "Winner 92", city: "TBD" },
  { id: 100, round: "QF", date: "Jul 11", home: "Winner 95", away: "Winner 96", city: "TBD" },
  // Semi-finals
  { id: 101, round: "SF", date: "Jul 14", home: "Winner 97", away: "Winner 98",  city: "Dallas" },
  { id: 102, round: "SF", date: "Jul 15", home: "Winner 99", away: "Winner 100", city: "Atlanta" },
  // Third place + Final
  { id: 103, round: "F3", date: "Jul 18", home: "Loser 101", away: "Loser 102", city: "Miami" },
  { id: 104, round: "FIN", date: "Jul 19", home: "Winner 101", away: "Winner 102", city: "New York/NJ" },
];

const ROUND_LABELS = {
  R32: "Round of 32",
  R16: "Round of 16",
  QF: "Quarter-finals",
  SF: "Semi-finals",
  F3: "3rd Place Playoff",
  FIN: "Final",
};

const ROUND_ORDER = ["R32", "R16", "QF", "SF", "F3", "FIN"];


const GROUP_COLORS = {
  A: "#E63946", B: "#457B9D", C: "#2D6A4F", D: "#E9C46A",
  E: "#6A0572", F: "#F4A261", G: "#264653", H: "#E76F51",
  I: "#A8DADC", J: "#1D3557", K: "#52B788", L: "#C77DFF",
};

const FLAGS = {
  "Mexico": "🇲🇽", "South Africa": "🇿🇦", "South Korea": "🇰🇷", "Czechia": "🇨🇿",
  "Canada": "🇨🇦", "Bosnia": "🇧🇦", "Qatar": "🇶🇦", "Switzerland": "🇨🇭",
  "Brazil": "🇧🇷", "Morocco": "🇲🇦", "Haiti": "🇭🇹", "Scotland": "🏴󠁧󠁢󠁳󠁣󠁴󠁿",
  "USA": "🇺🇸", "Paraguay": "🇵🇾", "Australia": "🇦🇺", "Türkiye": "🇹🇷",
  "Germany": "🇩🇪", "Curaçao": "🇨🇼", "Ivory Coast": "🇨🇮", "Ecuador": "🇪🇨",
  "Netherlands": "🇳🇱", "Japan": "🇯🇵", "Sweden": "🇸🇪", "Tunisia": "🇹🇳",
  "Belgium": "🇧🇪", "Egypt": "🇪🇬", "Iran": "🇮🇷", "New Zealand": "🇳🇿",
  "Spain": "🇪🇸", "Cape Verde": "🇨🇻", "Saudi Arabia": "🇸🇦", "Uruguay": "🇺🇾",
  "France": "🇫🇷", "Senegal": "🇸🇳", "Iraq": "🇮🇶", "Norway": "🇳🇴",
  "Argentina": "🇦🇷", "Algeria": "🇩🇿", "Austria": "🇦🇹", "Jordan": "🇯🇴",
  "Portugal": "🇵🇹", "DR Congo": "🇨🇩", "Uzbekistan": "🇺🇿", "Colombia": "🇨🇴",
  "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Croatia": "🇭🇷", "Ghana": "🇬🇭", "Panama": "🇵🇦",
};

function getTodayLabel() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function result(h, a) {
  const hg = Number(h), ag = Number(a);
  if (isNaN(hg) || isNaN(ag)) return null;
  return hg > ag ? "H" : ag > hg ? "A" : "D";
}

function calcPoints(predH, predA, realH, realA) {
  if (predH === "" || predA === "" || realH === "" || realA === "") return null;
  const pH = Number(predH), pA = Number(predA);
  const rH = Number(realH), rA = Number(realA);
  if (isNaN(pH) || isNaN(pA) || isNaN(rH) || isNaN(rA)) return null;
  if (pH === rH && pA === rA) return 3; // exact scoreline
  if (result(pH, pA) === result(rH, rA)) return 1; // correct result only
  return 0;
}

export default function App() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeGroup, setActiveGroup] = useState("A");
  const [activeRound, setActiveRound] = useState("R32");
  const [editingId, setEditingId] = useState(null);
  const [draft, setDraft] = useState({});
  const [tab, setTab] = useState("matches");

  // Subscribe to Firestore in real-time
  useEffect(() => {
    const unsub = onSnapshot(DOC_REF, snap => {
      setData(snap.exists() ? snap.data() : {});
      setLoading(false);
    });
    return unsub;
  }, []);

  const groupMatches = MATCHES.filter(m => m.group === activeGroup);
  const roundMatches = KNOCKOUTS.filter(m => m.round === activeRound);
  const todayLabel = getTodayLabel();
  const todayMatches = [...MATCHES, ...KNOCKOUTS].filter(m => m.date === todayLabel);

  function getMatch(id) { return data[id] || {}; }

  function startEdit(match) {
    setEditingId(match.id);
    const e = getMatch(match.id);
    const d = { real_home: e.real_home ?? "", real_away: e.real_away ?? "" };
    PLAYERS.forEach(p => {
      d[`${p.key}_home`] = e[`${p.key}_home`] ?? "";
      d[`${p.key}_away`] = e[`${p.key}_away`] ?? "";
    });
    setDraft(d);
  }

  function saveDraft(id) {
    // auto-calculate points for each player
    const saved = { ...draft };
    PLAYERS.forEach(p => {
      saved[`${p.key}_pts`] = calcPoints(
        draft[`${p.key}_home`], draft[`${p.key}_away`],
        draft.real_home, draft.real_away
      );
    });
    setData(prev => {
      const next = { ...prev, [id]: saved };
      setDoc(DOC_REF, next);
      return next;
    });
    setEditingId(null);
  }

  function totalPts(playerKey) {
    return Object.values(data).reduce((sum, m) => sum + (Number(m[`${playerKey}_pts`]) || 0), 0);
  }

  const totals = PLAYERS.map(p => ({ ...p, total: totalPts(p.key) }));
  const maxPts = Math.max(...totals.map(t => t.total));
  const leaders = totals.filter(t => t.total === maxPts && maxPts > 0).map(t => t.name);

  function ScoreInput({ field }) {
    return (
      <input
        type="number" min="0" max="99" placeholder="–"
        value={draft[field]}
        onChange={e => setDraft(p => ({ ...p, [field]: e.target.value }))}
        style={{
          width: 40, textAlign: "center", fontSize: 15, fontWeight: 700,
          border: "2px solid #334155", borderRadius: 6, padding: "4px 0",
          background: "#0f172a", color: "#f8fafc", outline: "none",
        }}
      />
    );
  }

  function MatchRow({ match }) {
    const saved = getMatch(match.id);
    const isEditing = editingId === match.id;
    const isKnockout = !!match.round;
    const badgeColor = isKnockout ? "#475569" : GROUP_COLORS[match.group];
    const badgeLabel = isKnockout ? ROUND_LABELS[match.round] : `GRP ${match.group}`;
    const hasResult = saved.real_home !== "" && saved.real_home !== undefined;
    const isTbd = match.home.startsWith("Winner") || match.home.startsWith("Loser") ||
                  match.away.startsWith("Winner") || match.away.startsWith("Loser");

    return (
      <div style={{
        background: "#1e293b", borderRadius: 10, marginBottom: 8,
        border: "1px solid #334155", overflow: "hidden",
        opacity: isTbd ? 0.55 : 1,
      }}>
        {/* Header row */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8,
          padding: "10px 12px 8px",
          borderBottom: (isEditing || (!isEditing && hasResult)) ? "1px solid #1e3a5f22" : "none",
        }}>
          <span style={{
            background: badgeColor, color: "#fff",
            fontSize: 10, fontWeight: 800, letterSpacing: 1,
            borderRadius: 4, padding: "2px 6px", flexShrink: 0,
          }}>{badgeLabel}</span>
          <span style={{ color: "#64748b", fontSize: 11, flexShrink: 0 }}>{match.date}</span>
          <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, flexWrap: "wrap" }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>
              {FLAGS[match.home] ? `${FLAGS[match.home]} ` : ""}{match.home}
            </span>
            <span style={{ color: "#475569", fontSize: 11, fontWeight: 600 }}>vs</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: "#e2e8f0" }}>
              {match.away}{FLAGS[match.away] ? ` ${FLAGS[match.away]}` : ""}
            </span>
          </div>
          {isKnockout && match.city && match.city !== "TBD" && !hasResult && (
            <span style={{ color: "#475569", fontSize: 10, flexShrink: 0 }}>{match.city}</span>
          )}
          {hasResult && !isEditing && (
            <span style={{
              background: "#0f172a", border: "1px solid #334155",
              borderRadius: 6, padding: "2px 8px",
              fontSize: 13, fontWeight: 800, color: "#94a3b8", flexShrink: 0,
            }}>{saved.real_home}–{saved.real_away}</span>
          )}
          {isTbd && !hasResult ? (
            <span style={{ color: "#475569", fontSize: 10, fontStyle: "italic", flexShrink: 0 }}>TBD</span>
          ) : (
          <button
            onClick={() => isEditing ? saveDraft(match.id) : startEdit(match)}
            style={{
              background: isEditing ? badgeColor : "transparent",
              color: isEditing ? "#fff" : "#64748b",
              border: isEditing ? "none" : "1px solid #334155",
              borderRadius: 6, padding: "4px 10px",
              fontSize: 11, fontWeight: 700, cursor: "pointer", flexShrink: 0,
            }}
          >{isEditing ? "Save" : "Edit"}</button>
          )}
          {isEditing && (
            <button onClick={() => setEditingId(null)} style={{
              background: "transparent", color: "#64748b",
              border: "1px solid #334155", borderRadius: 6,
              padding: "4px 8px", fontSize: 11, cursor: "pointer", flexShrink: 0,
            }}>✕</button>
          )}
        </div>

        {/* Saved prediction summary */}
        {!isEditing && hasResult && (
          <div style={{ padding: "8px 12px 10px", display: "flex", gap: 12, flexWrap: "wrap" }}>
            {PLAYERS.map(p => {
              const ph = saved[`${p.key}_home`];
              const pa = saved[`${p.key}_away`];
              const pts = saved[`${p.key}_pts`];
              if (ph === "" || ph === undefined) return null;
              return (
                <div key={p.key} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: p.color, minWidth: 36 }}>{p.name}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#cbd5e1" }}>{ph}–{pa}</span>
                  {pts !== null && pts !== undefined && (
                    <span style={{
                      background: pts > 0 ? p.color + "25" : "#33415522",
                      color: pts > 0 ? p.color : "#475569",
                      fontSize: 11, fontWeight: 800,
                      borderRadius: 4, padding: "1px 6px",
                    }}>{pts > 0 ? `+${pts}` : "0"}</span>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Edit form */}
        {isEditing && (
          <div style={{ padding: "12px 12px 14px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {/* Real result */}
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: "#94a3b8", letterSpacing: 1, minWidth: 64 }}>RESULT</div>
                <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <ScoreInput field="real_home" />
                  <span style={{ color: "#475569", fontSize: 12 }}>–</span>
                  <ScoreInput field="real_away" />
                </div>
              </div>
              {/* Per-player predictions */}
              {PLAYERS.map(p => (
                <div key={p.key} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: 1, minWidth: 64 }}>{p.name.toUpperCase()}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
                    <ScoreInput field={`${p.key}_home`} />
                    <span style={{ color: "#475569", fontSize: 12 }}>–</span>
                    <ScoreInput field={`${p.key}_away`} />
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 8, fontSize: 10, color: "#475569" }}>
              Points are calculated automatically: 3pts exact score · 1pt correct result
            </div>
          </div>
        )}
      </div>
    );
  }

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', 'Segoe UI', sans-serif", color: "#64748b", fontSize: 14 }}>
      Loading…
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", fontFamily: "'Inter', 'Segoe UI', sans-serif", color: "#f8fafc" }}>
      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        borderBottom: "1px solid #1e293b", padding: "20px 16px 0",
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <span style={{ fontSize: 26 }}>⚽</span>
            <div>
              <div style={{ fontSize: 18, fontWeight: 800, letterSpacing: -0.5 }}>World Cup 2026</div>
              <div style={{ fontSize: 11, color: "#64748b", letterSpacing: 1, textTransform: "uppercase" }}>Prediction Tracker</div>
            </div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
              {totals.map(p => (
                <ScorePill key={p.key} name={p.name} pts={p.total} color={p.color} isLeading={leaders.includes(p.name)} />
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 0, marginTop: 16 }}>
            {["matches", "knockouts", "scoreboard"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                background: "none", border: "none", cursor: "pointer",
                padding: "8px 16px", fontSize: 12, fontWeight: 700, letterSpacing: 0.5,
                color: tab === t ? "#f8fafc" : "#64748b",
                borderBottom: tab === t ? "2px solid #38bdf8" : "2px solid transparent",
                textTransform: "uppercase", transition: "all 0.15s",
              }}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "16px" }}>
        {tab === "matches" && (
          <>
            {todayMatches.length > 0 && (
              <div style={{ marginBottom: 20 }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 8, marginBottom: 10,
                }}>
                  <span style={{ fontSize: 16 }}>📅</span>
                  <span style={{ fontSize: 12, fontWeight: 800, color: "#f8fafc", letterSpacing: 1, textTransform: "uppercase" }}>
                    Today's Matches
                  </span>
                </div>
                {todayMatches.map(m => <MatchRow key={`today-${m.id}`} match={m} />)}
              </div>
            )}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {Object.keys(GROUPS).map(g => (
                <button key={g} onClick={() => setActiveGroup(g)} style={{
                  background: activeGroup === g ? GROUP_COLORS[g] : "#1e293b",
                  color: activeGroup === g ? "#fff" : "#94a3b8",
                  border: `1px solid ${activeGroup === g ? GROUP_COLORS[g] : "#334155"}`,
                  borderRadius: 6, padding: "5px 10px",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                }}>{g}</button>
              ))}
            </div>
            <div style={{
              background: "#1e293b", borderRadius: 8, padding: "7px 12px",
              marginBottom: 12, display: "flex", gap: 8, flexWrap: "wrap",
            }}>
              {GROUPS[activeGroup].map(t => (
                <span key={t} style={{ fontSize: 12, color: "#94a3b8" }}>{FLAGS[t]} {t}</span>
              ))}
            </div>
            {groupMatches.map(m => <MatchRow key={m.id} match={m} />)}
          </>
        )}
        {tab === "knockouts" && (
          <>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
              {ROUND_ORDER.map(r => (
                <button key={r} onClick={() => setActiveRound(r)} style={{
                  background: activeRound === r ? "#475569" : "#1e293b",
                  color: activeRound === r ? "#fff" : "#94a3b8",
                  border: `1px solid ${activeRound === r ? "#475569" : "#334155"}`,
                  borderRadius: 6, padding: "5px 10px",
                  fontSize: 12, fontWeight: 700, cursor: "pointer", transition: "all 0.15s",
                }}>{ROUND_LABELS[r]}</button>
              ))}
            </div>
            {roundMatches.map(m => <MatchRow key={m.id} match={m} />)}
          </>
        )}
        {tab === "scoreboard" && <Scoreboard data={data} totals={totals} leaders={leaders} />}
      </div>
    </div>
  );
}

function ScorePill({ name, pts, color, isLeading }) {
  return (
    <div style={{
      background: isLeading ? color + "22" : "#1e293b",
      border: `1px solid ${isLeading ? color : "#334155"}`,
      borderRadius: 8, padding: "4px 10px", textAlign: "center",
    }}>
      <div style={{ fontSize: 10, color: "#64748b", fontWeight: 600 }}>{name}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color, lineHeight: 1 }}>{pts}</div>
    </div>
  );
}

function Scoreboard({ data, totals, leaders }) {
  const played = Object.values(data).filter(m => m.real_home !== "" && m.real_home !== undefined).length;
  const sorted = [...totals].sort((a, b) => b.total - a.total);

  return (
    <div>
      {/* Podium */}
      <div style={{
        background: "#1e293b", borderRadius: 12, padding: 24,
        textAlign: "center", marginBottom: 16, border: "1px solid #334155",
      }}>
        {leaders.length === 1 && (
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12, letterSpacing: 1 }}>
            🏆 {leaders[0]} is leading!
          </div>
        )}
        {leaders.length > 1 && totals[0].total > 0 && (
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 12 }}>🤝 It's a tie!</div>
        )}
        <div style={{ display: "flex", justifyContent: "center", alignItems: "flex-end", gap: 16 }}>
          {sorted.map((p, i) => (
            <div key={p.key} style={{ textAlign: "center" }}>
              {i === 0 && <div style={{ fontSize: 20, marginBottom: 4 }}>🥇</div>}
              {i === 1 && <div style={{ fontSize: 20, marginBottom: 4 }}>🥈</div>}
              {i === 2 && <div style={{ fontSize: 20, marginBottom: 4 }}>🥉</div>}
              <div style={{ fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: 1, marginBottom: 2 }}>{p.name.toUpperCase()}</div>
              <div style={{ fontSize: i === 0 ? 52 : 40, fontWeight: 900, color: p.color, lineHeight: 1 }}>{p.total}</div>
              <div style={{ fontSize: 10, color: "#64748b", marginTop: 2 }}>pts</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 14, fontSize: 12, color: "#475569" }}>{played} matches with results entered</div>
        <div style={{ marginTop: 4, fontSize: 11, color: "#334155" }}>3pts exact score · 1pt correct result</div>
      </div>

      {/* Per-group breakdown */}
      <div style={{ fontSize: 11, fontWeight: 700, color: "#64748b", letterSpacing: 1, marginBottom: 10 }}>POINTS BY GROUP</div>
      {Object.keys(GROUPS).map(g => {
        const gMatches = MATCHES.filter(m => m.group === g);
        const groupTotals = PLAYERS.map(p => ({
          ...p,
          pts: gMatches.reduce((s, m) => s + (Number((data[m.id] || {})[`${p.key}_pts`]) || 0), 0),
        }));
        if (groupTotals.every(p => p.pts === 0)) return null;
        return (
          <div key={g} style={{
            background: "#1e293b", borderRadius: 8, padding: "10px 14px",
            marginBottom: 6, display: "flex", alignItems: "center", gap: 12,
            border: "1px solid #334155",
          }}>
            <span style={{
              background: GROUP_COLORS[g], color: "#fff",
              fontSize: 10, fontWeight: 800, borderRadius: 4, padding: "2px 7px",
              minWidth: 50, textAlign: "center", flexShrink: 0,
            }}>GROUP {g}</span>
            <div style={{ flex: 1, display: "flex", gap: 16, flexWrap: "wrap" }}>
              {groupTotals.map(p => (
                <span key={p.key} style={{ fontSize: 13, fontWeight: 700, color: p.color }}>
                  {p.name}: {p.pts}
                </span>
              ))}
            </div>
          </div>
        );
      })}

      {played === 0 && (
        <div style={{ textAlign: "center", color: "#475569", padding: 32, fontSize: 14 }}>
          No results entered yet. Edit matches to start tracking!
        </div>
      )}
    </div>
  );
}
