import{a0 as M,a6 as p,aw as P,ax as A,b as j,j as t,aB as u,an as F,bl as k,R as w,a as I}from"./index-C9RDM1dh.js";import{e as f,C as c,c as G}from"./ToLatex-DU__yYsY.js";function E(e){const n=a(e);if(n.kind==="literal"){if(n.value.kind===p.NAT)return n.value.value;if(n.value.kind===p.C&&n.value.value.im===0)return n.value.value.re}throw new Error("identityToTex: scan count must be a literal Nat or integer C")}function a(e){switch(e.kind){case"metavar":return{kind:"ref",name:e.name};case"literal":return{kind:"literal",value:e.value};case"ref":return{kind:"ref",name:e.name};case"const":return{kind:"const",name:e.name};case"scale":return{kind:"scale",scalar:a(e.scalar),arg:a(e.arg)};case"matMul":return{kind:"matMul",factors:e.factors.map(a)};case"matActOn":return{kind:"matActOn",mat:a(e.mat),vec:a(e.vec)};case"kron":return{kind:"kron",factors:e.factors.map(a)};case"dagger":return{kind:"dagger",expr:a(e.expr)};case"sum":return{kind:"sum",addends:e.addends.map(a)};case"product":return{kind:"product",factors:e.factors.map(a)};case"div":return{kind:"div",left:a(e.left),right:a(e.right)};case"app":return{kind:"app",fn:a(e.fn),arg:a(e.arg)};case"deriv":return{kind:"deriv",fn:a(e.fn)};case"lam":return{kind:"lam",param:e.param,paramShape:e.paramShape,body:a(e.body)};case"finSum":return{kind:"finSum",index:e.index,dim:e.dim,body:a(e.body)};case"tensorComprehension":return e.variance===void 0?{kind:"tensorComprehension",index:e.index,dim:e.dim,body:a(e.body)}:{kind:"tensorComprehension",index:e.index,dim:e.dim,variance:e.variance,body:a(e.body)};case"contract":return{kind:"contract",expr:a(e.expr),i:e.i,j:e.j};case"outer":return{kind:"outer",factors:e.factors.map(a)};case"vecExpr":return{kind:"vecExpr",components:e.components.map(a)};case"matExpr":return{kind:"matExpr",columns:e.columns.map(a)};case"at":return{kind:"at",target:a(e.target),index:a(e.index)};case"scan":return{kind:"scan",step:a(e.step),seed:a(e.seed),count:E(e.count)};default:return M(e)}}function T(e,n,i){const s=f(a(e.lhs),n,i),r=f(a(e.rhs),n,i);return`${s} = ${r}`}const N=`-- AUTO-GENERATED from src/MatUI/Expr/identities/ by \`npm run gen-lean\` — do not edit.
-- Proofs for these statements live in Proofs/LinearAlgebra.lean.
-- Matrix metavars are typed square with one shared dimension (Matrix (Fin n) (Fin n) ℂ);
-- the TS identity may also fire on rectangular matrices — these are the square instance (ADR 025).
import Mathlib

set_option linter.style.longLine false

open Matrix

namespace Generated.LinearAlgebra

/-- \`linear-algebra.act-identity\` — matActOn(I, ?v) = ?v -/
def actIdentity : Prop := ∀ {n : ℕ} (v : Fin n → ℂ), (1 : Matrix (Fin n) (Fin n) ℂ) *ᵥ v = v

/-- \`linear-algebra.combine-scaled-sum\` — sum(scale(?s, ?X), scale(?t, ?X)) = scale(sum(?s, ?t), ?X) -/
def combineScaledSum : Prop := ∀ {n : ℕ} (s t : ℂ) (X : Matrix (Fin n) (Fin n) ℂ), (s • X) + (t • X) = (s + t) • X

/-- \`linear-algebra.dagger-identity\` — dagger(I) = I -/
def daggerIdentity : Prop := ∀ {n : ℕ}, (1 : Matrix (Fin n) (Fin n) ℂ)ᴴ = (1 : Matrix (Fin n) (Fin n) ℂ)

/-- \`linear-algebra.dagger-of-product\` — dagger(matMul(?A, ?B)) = matMul(dagger(?B), dagger(?A)) -/
def daggerOfProduct : Prop := ∀ {n : ℕ} (A B : Matrix (Fin n) (Fin n) ℂ), (A * B)ᴴ = Bᴴ * Aᴴ

/-- \`linear-algebra.dagger-of-sum\` — dagger(sum(?A, ?B)) = sum(dagger(?A), dagger(?B)) -/
def daggerOfSum : Prop := ∀ {n : ℕ} (A B : Matrix (Fin n) (Fin n) ℂ), (A + B)ᴴ = Aᴴ + Bᴴ

/-- \`linear-algebra.double-dagger\` — dagger(dagger(?A)) = ?A -/
def doubleDagger : Prop := ∀ {n : ℕ} (A : Matrix (Fin n) (Fin n) ℂ), Aᴴᴴ = A

/-- \`linear-algebra.left-identity\` — matMul(I, ?M) = ?M -/
def leftIdentity : Prop := ∀ {n : ℕ} (M : Matrix (Fin n) (Fin n) ℂ), (1 : Matrix (Fin n) (Fin n) ℂ) * M = M

/-- \`linear-algebra.matActOn-of-matMul\` — matActOn(matMul(?A, ?B), ?v) = matActOn(?A, matActOn(?B, ?v)) -/
def matActOnOfMatMul : Prop := ∀ {n : ℕ} (v : Fin n → ℂ) (A B : Matrix (Fin n) (Fin n) ℂ), (A * B) *ᵥ v = A *ᵥ (B *ᵥ v)

/-- \`linear-algebra.right-identity\` — matMul(?M, I) = ?M -/
def rightIdentity : Prop := ∀ {n : ℕ} (M : Matrix (Fin n) (Fin n) ℂ), M * (1 : Matrix (Fin n) (Fin n) ℂ) = M

/-- \`linear-algebra.scale-assoc\` — scale(?s, scale(?t, ?x)) = scale(product(?s, ?t), ?x) -/
def scaleAssoc : Prop := ∀ {n : ℕ} (s t : ℂ) (x : Matrix (Fin n) (Fin n) ℂ), s • (t • x) = (s * t) • x

/-- \`linear-algebra.scale-distributes-matActOn\` — matActOn(?M, scale(?s, ?v)) = scale(?s, matActOn(?M, ?v)) -/
def scaleDistributesMatActOn : Prop := ∀ {n : ℕ} (s : ℂ) (v : Fin n → ℂ) (M : Matrix (Fin n) (Fin n) ℂ), M *ᵥ (s • v) = s • (M *ᵥ v)

/-- \`linear-algebra.zero-scale\` — 0 · s = 0  (scalar s) -/
def zeroScale : Prop := ∀ (s : ℂ), 0 • s = 0

end Generated.LinearAlgebra
`,O=`-- AUTO-GENERATED from src/MatUI/Expr/identities/ by \`npm run gen-lean\` — do not edit.
-- Proofs for these statements live in Proofs/Pauli.lean.
import Mathlib

set_option linter.style.longLine false

open Matrix

namespace Generated.Pauli

noncomputable def σ : ℕ → Matrix (Fin 2) (Fin 2) ℂ
  | 1 => !![0, 1; 1, 0]
  | 2 => !![0, -Complex.I; Complex.I, 0]
  | 3 => !![1, 0; 0, -1]
  | _ => 0  -- unreachable: the family is indexed 1..3

noncomputable def δ : ℕ → ℕ → ℂ := fun i j => if i = j then 1 else 0

/-- Inversions in an index list: pairs (earlier, later) with earlier > later. -/
def inversions : List ℕ → ℕ
  | []      => 0
  | x :: xs => (xs.filter (· < x)).length + inversions xs

/-- Levi-Civita sign of an index list: 0 if any index repeats, else (−1)^inversions. -/
noncomputable def ε (l : List ℕ) : ℂ :=
  if l.Nodup then (if inversions l % 2 = 0 then 1 else -1) else 0

/-- \`pauli.s1s1\` — σ_1² = I -/
def s1s1 : Prop := σ 1 * σ 1 = 1

/-- \`pauli.s1s2\` — σ_1 σ_2 = +i σ_3 -/
def s1s2 : Prop := σ 1 * σ 2 = Complex.I • σ 3

/-- \`pauli.s1s3\` — σ_1 σ_3 = −i σ_2 -/
def s1s3 : Prop := σ 1 * σ 3 = (-Complex.I) • σ 2

/-- \`pauli.s2s1\` — σ_2 σ_1 = −i σ_3 -/
def s2s1 : Prop := σ 2 * σ 1 = (-Complex.I) • σ 3

/-- \`pauli.s2s2\` — σ_2² = I -/
def s2s2 : Prop := σ 2 * σ 2 = 1

/-- \`pauli.s2s3\` — σ_2 σ_3 = +i σ_1 -/
def s2s3 : Prop := σ 2 * σ 3 = Complex.I • σ 1

/-- \`pauli.s3s1\` — σ_3 σ_1 = +i σ_2 -/
def s3s1 : Prop := σ 3 * σ 1 = Complex.I • σ 2

/-- \`pauli.s3s2\` — σ_3 σ_2 = −i σ_1 -/
def s3s2 : Prop := σ 3 * σ 2 = (-Complex.I) • σ 1

/-- \`pauli.s3s3\` — σ_3² = I -/
def s3s3 : Prop := σ 3 * σ 3 = 1

/-- \`pauli.spatial-product\` — σ_i σ_j = δ_{ij} I + i Σ_k ε_{ijk} σ_k -/
def spatialProduct : Prop := ∀ (i j : ℕ), i ∈ ({1, 2, 3} : Finset ℕ) → j ∈ ({1, 2, 3} : Finset ℕ) → σ i * σ j = ((δ i j) • 1) + (Complex.I • (∑ k ∈ Finset.Icc 1 3, (ε [i, j, k]) • σ k))

end Generated.Pauli
`,L=`-- AUTO-GENERATED from src/MatUI/Expr/identities/ by \`npm run gen-lean\` — do not edit.
-- Proofs for these statements live in Proofs/TensorAlgebra.lean.
-- Matrix metavars are typed square with one shared dimension (Matrix (Fin n) (Fin n) ℂ);
-- the TS identity may also fire on rectangular matrices — these are the square instance (ADR 025).
import Mathlib

set_option linter.style.longLine false

open Matrix

namespace Generated.TensorAlgebra

noncomputable def δ : ℕ → ℕ → ℂ := fun i j => if i = j then 1 else 0

/-- Inversions in an index list: pairs (earlier, later) with earlier > later. -/
def inversions : List ℕ → ℕ
  | []      => 0
  | x :: xs => (xs.filter (· < x)).length + inversions xs

/-- Levi-Civita sign of an index list: 0 if any index repeats, else (−1)^inversions. -/
noncomputable def ε (l : List ℕ) : ℂ :=
  if l.Nodup then (if inversions l % 2 = 0 then 1 else -1) else 0

/-- \`tensor-algebra.epsilon-delta\` — Σ_k ε_{ijk} ε_{lmk} = δ_{il} δ_{jm} − δ_{im} δ_{jl} -/
def epsilonDelta : Prop := ∀ (i j l m : ℕ), i ∈ ({1, 2, 3} : Finset ℕ) → j ∈ ({1, 2, 3} : Finset ℕ) → l ∈ ({1, 2, 3} : Finset ℕ) → m ∈ ({1, 2, 3} : Finset ℕ) → ∑ k ∈ Finset.Icc 1 3, (ε [i, j, k]) * (ε [l, m, k]) = ((δ i l) * (δ j m)) + ((-1) • ((δ i m) * (δ j l)))

/-- \`tensor-algebra.trace-of-scale\` — tr(c · A) = c · tr(A) -/
def traceOfScale : Prop := ∀ {n : ℕ} (c : ℂ) (A : Matrix (Fin n) (Fin n) ℂ), Matrix.trace (c • A) = c • (Matrix.trace A)

/-- \`tensor-algebra.trace-of-sum\` — tr(A + B) = tr(A) + tr(B) -/
def traceOfSum : Prop := ∀ {n : ℕ} (A B : Matrix (Fin n) (Fin n) ℂ), Matrix.trace (A + B) = (Matrix.trace A) + (Matrix.trace B)

end Generated.TensorAlgebra
`,S=`-- AUTO-GENERATED from src/MatUI/Expr/identities/ by \`npm run gen-lean\` — do not edit.
-- Aggregator: imports every per-category statement module.
import Proofs.Generated.LinearAlgebra
import Proofs.Generated.Pauli
import Proofs.Generated.TensorAlgebra
`,C=`import Mathlib

namespace LinearAlgebra

open Matrix

variable {n : Type*} [Fintype n] [DecidableEq n]


theorem rightIdentity (M : Matrix n n ℂ) : M * 1 = M := by
  rw [Matrix.mul_one]


end LinearAlgebra
`,B=`import Proofs.Generated.Pauli

/-!
# Pauli matrix identities — proofs

Each theorem here closes a *generated* proposition \`Generated.Pauli.sXsY\`, whose
statement was printed from the TS identity \`pauli.sXsY\`
(\`src/MatUI/Expr/identities/Pauli.ts\`) by \`npm run gen-lean\`. The Pauli matrices
\`σ\` themselves are generated into \`Proofs/Generated/Pauli.lean\` from the same TS
Prelude value MatUI evaluates (\`src/MatUI/Prelude/PauliMatrices.ts\`), so there is
no hand-written Lean encoding that could silently drift from MatUI.

\`lake build\` checking these proofs against the generated statements *is* the
faithfulness check: change a sign in the TS identity, regenerate, and the
matching proof below no longer type-checks.

Index encoding matches MatUI exactly: \`σ\` is the 1-based family \`σ 1 = σ₁,
σ 2 = σ₂, σ 3 = σ₃\`; the identity I is Mathlib's \`1\`, not a \`σ 0\` slot.
-/

open Matrix

namespace Pauli

-- Every generated Pauli statement is an equation between concrete 2×2 complex
-- matrices, so it is decided entrywise: unfold the statement and \`Generated.Pauli.σ\`,
-- expand the product (\`Matrix.mul_apply\` + \`Fin.sum_univ_two\`), the scalar action
-- (\`Matrix.smul_apply\`) and the identity matrix (\`Matrix.one_apply\`), then settle
-- the four resulting complex equations by real/imaginary parts (\`Complex.ext_iff\`).
-- A single uniform recipe handles squares and off-diagonal products alike, so the
-- per-goal "unused simp arg" linter is expected and disabled for this file.
set_option linter.unusedSimpArgs false in
/-- Decide a concrete generated Pauli identity by entrywise complex arithmetic. -/
macro "pauli_entrywise" : tactic =>
  \`(tactic|
    (ext i j
     fin_cases i <;> fin_cases j <;>
       simp [Generated.Pauli.σ, Matrix.mul_apply, Fin.sum_univ_two, Matrix.smul_apply,
             Matrix.one_apply, Complex.ext_iff]))

set_option linter.unusedSimpArgs false

-- Squares: σ_i² = I.
theorem s1s1 : Generated.Pauli.s1s1 := by unfold Generated.Pauli.s1s1; pauli_entrywise
theorem s2s2 : Generated.Pauli.s2s2 := by unfold Generated.Pauli.s2s2; pauli_entrywise
theorem s3s3 : Generated.Pauli.s3s3 := by unfold Generated.Pauli.s3s3; pauli_entrywise

-- Off-diagonal products: σ_i σ_j = ±i σ_k.
theorem s1s2 : Generated.Pauli.s1s2 := by unfold Generated.Pauli.s1s2; pauli_entrywise
theorem s2s1 : Generated.Pauli.s2s1 := by unfold Generated.Pauli.s2s1; pauli_entrywise
theorem s2s3 : Generated.Pauli.s2s3 := by unfold Generated.Pauli.s2s3; pauli_entrywise
theorem s3s2 : Generated.Pauli.s3s2 := by unfold Generated.Pauli.s3s2; pauli_entrywise
theorem s3s1 : Generated.Pauli.s3s1 := by unfold Generated.Pauli.s3s1; pauli_entrywise
theorem s1s3 : Generated.Pauli.s1s3 := by unfold Generated.Pauli.s1s3; pauli_entrywise

-- The general spatial product law σ_i σ_j = δ_{ij} I + i Σ_k ε_{ijk} σ_k. After
-- \`fin_cases\` pins i, j ∈ {1,2,3} to literals, δ and ε [i,j,k] reduce to concrete
-- ℂ scalars (ε via its list permutation-sign def + \`inversions\`; \`decide := true\`
-- discharges the \`List.Nodup\` / comparison conditions), and each of the nine cases
-- is a concrete 2×2 matrix equation — decided entrywise like the products above.
-- The RHS's contraction (a genuine \`∑ k ∈ Finset.Icc 1 3\` since plan 027) is
-- unrolled first: the Icc rewrites to the literal finset \`{1, 2, 3}\` (decide) and
-- \`Finset.sum_insert\`/\`sum_singleton\` expand it; \`Matrix.sum_apply\` pushes the
-- entrywise \`ext\` through the sum, and \`Matrix.add_apply\` handles the addition.
theorem spatialProduct : Generated.Pauli.spatialProduct := by
  unfold Generated.Pauli.spatialProduct
  intro i j hi hj
  fin_cases hi <;> fin_cases hj <;>
    (ext a b
     fin_cases a <;> fin_cases b <;>
       simp (config := { decide := true })
         [Generated.Pauli.σ, Generated.Pauli.δ, Generated.Pauli.ε, Generated.Pauli.inversions,
          show (Finset.Icc 1 3 : Finset ℕ) = {1, 2, 3} from by decide,
          Finset.sum_insert, Finset.mem_insert, Finset.mem_singleton, Finset.sum_singleton,
          Matrix.sum_apply,
          Matrix.mul_apply, Fin.sum_univ_two, Matrix.smul_apply, Matrix.add_apply,
          Matrix.one_apply, Complex.ext_iff])

end Pauli
`;function g(e){return D(e)}function R(e){return U(e.name)}function U(e){const[n,...i]=e.split("-");return n+i.map(x).join("")}function D(e){return e.split("-").map(x).join("")}function x(e){return e.charAt(0).toUpperCase()+e.slice(1)}const q=_(Object.assign({"../../proofs/Proofs/Generated/LinearAlgebra.lean":N,"../../proofs/Proofs/Generated/Pauli.lean":O,"../../proofs/Proofs/Generated/TensorAlgebra.lean":L})),$=_(Object.assign({"../../proofs/Proofs/Generated.lean":S,"../../proofs/Proofs/LinearAlgebra.lean":C,"../../proofs/Proofs/Pauli.lean":B}));function _(e){const n=new Map;for(const[i,s]of Object.entries(e)){const r=i.split("/").pop().replace(/\.lean$/,"");n.set(r,s)}return n}function X(e){return e.lean===void 0?"asserted":e.lean.kind}function H(e){var s;const n=g(e.category),i=`proofs/Proofs/Generated/${n}.lean`;return((s=e.lean)==null?void 0:s.kind)==="proven"?{generated:i,proof:`proofs/Proofs/${n}.lean`}:{generated:i}}const z=/^(\/--|--|def |theorem |noncomputable |macro |namespace |end |section |open |set_option |import |attribute |@)/,Y=/^\s*\/--.*-\/\s*$/;function h(e,n){const i=e.split(`
`),s=new RegExp(`^(?:noncomputable\\s+)?(?:def|theorem)\\s+${V(n)}\\b`),r=i.findIndex(d=>s.test(d));if(r===-1)return null;const l=r>0&&Y.test(i[r-1])?r-1:r;let o=r+1;for(;o<i.length&&!z.test(i[o]);)o++;return i.slice(l,o).join(`
`).trimEnd()}function V(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}function J(e){var r;const n={},i=R(e),s=g(e.category);if(e.lean!==void 0){const l=q.get(s),o=l?h(l,i):null;o&&(n.statement=o)}if(((r=e.lean)==null?void 0:r.kind)==="proven"){const l=e.lean.by.split(".").pop(),o=$.get(s),d=o?h(o,l):null;d&&(n.proof=d)}return n}const b=new Map,y=new Map;P(k,new Map,new Map,b,void 0,y);function K(e){return{__html:F.renderToString(e,{displayMode:!1,throwOnError:!1})}}const Q={asserted:"asserted",statement:"Lean statement",proven:"proven"},W=Object.keys(c).sort((e,n)=>c[e].order-c[n].order).map(e=>({cat:e,label:c[e].label,color:c[e].color,ids:A.filter(n=>n.category===e).sort(G)})).filter(e=>e.ids.length>0);function Z({id:e}){const n=X(e),i=H(e),s=J(e),r=T(e,b,y),l=e.bidirectional?"⇄":"→",o=e.metavarSorts?Object.entries(e.metavarSorts):[],d=n==="proven"?i.proof:n==="statement"?i.generated:void 0;return t.jsx("article",{id:u(e),className:"ident",children:t.jsxs("details",{children:[t.jsxs("summary",{className:"ident-row",children:[t.jsx("code",{className:"ident-name",title:u(e),children:e.name}),t.jsx("span",{className:"ident-statement",dangerouslySetInnerHTML:K(r)}),t.jsx("span",{className:"ident-dir",title:e.bidirectional?"bidirectional":"directed",children:l}),t.jsx("span",{className:`status-badge status-${n}`,children:Q[n]}),d&&t.jsx("span",{className:"ident-file",children:d})]}),t.jsxs("div",{className:"ident-detail",children:[t.jsx("div",{className:"ident-desc",children:e.description}),o.length>0&&t.jsx("div",{className:"ident-shapes",children:o.map(([m,v])=>t.jsxs("span",{className:"shape-chip",children:[t.jsx("em",{children:m})," : ",v]},m))}),s.statement&&t.jsxs("div",{className:"lean-block",children:[t.jsxs("div",{className:"lean-block-label",children:["statement · ",i.generated]}),t.jsx("pre",{className:"lean-code",children:s.statement})]}),s.proof&&t.jsxs("div",{className:"lean-block",children:[t.jsxs("div",{className:"lean-block-label",children:["proof · ",i.proof]}),t.jsx("pre",{className:"lean-code",children:s.proof})]})]})]})})}function ee(){return j.useEffect(()=>{function e(){var i;const n=window.location.hash.slice(1);n&&((i=document.getElementById(n))==null||i.scrollIntoView({behavior:"smooth"}))}return e(),window.addEventListener("hashchange",e),()=>window.removeEventListener("hashchange",e)},[]),t.jsxs("div",{className:"identities-page",children:[t.jsxs("header",{className:"identities-header",children:[t.jsx("a",{href:"/mat-ui/",children:t.jsx("img",{src:"/mat-ui/logo.svg",height:40,alt:"mat-ui"})}),t.jsx("span",{className:"identities-title",children:"Identities"})]}),t.jsxs("main",{className:"identities-main",children:[t.jsxs("p",{className:"identities-intro",children:["The library of algebraic identities backing symbolic rewriting, grouped by category. Each shows its Lean status — ",t.jsx("em",{children:"asserted"})," (TypeScript only), a generated ",t.jsx("em",{children:"Lean statement"}),", or fully ",t.jsx("em",{children:"proven"})," — and expands to its description, metavariable shapes, and Lean source."]}),W.map(e=>t.jsxs("section",{className:"ident-category",children:[t.jsx("h2",{className:"ident-category-heading",style:{borderColor:e.color},children:e.label}),e.ids.map(n=>t.jsx(Z,{id:n},u(n)))]},e.cat))]})]})}w.createRoot(document.getElementById("root")).render(t.jsx(I.StrictMode,{children:t.jsx(ee,{})}));
