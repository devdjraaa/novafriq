# Pour Kaiffre — repartir sur le bon dépôt

Ton travail est **récupéré et en ligne** : la pull request a été fusionnée, la CI
est passée, et <https://novafriq.africa> sert bien le site complet.

Il reste une chose à corriger dans ta configuration. Tu as **forké** le dépôt au
lieu de le cloner. Un fork est une copie séparée sur ton compte : ton travail n'y
revient que par pull request, et à chaque fois il faut résoudre les écarts
accumulés entre les deux copies. C'est ce qui a bloqué cette fois-ci.

En clonant le dépôt d'origine, tu pousses directement dessus : plus de fork, plus
de pull request obligatoire, plus de conflits à rattraper.

---

## 1. Avant tout : mets ton travail en cours à l'abri

Si tu as des modifications non poussées, envoie-les sur ton fork **maintenant**.
Sinon tu les perdrais en supprimant le dossier.

```bash
cd <ton-dossier-novafriq-actuel>
git status                 # regarde ce qui n'est pas encore validé
git add -A
git commit -m "wip: travail en cours avant bascule"
git push origin main       # part sur TON fork, on le récupérera si besoin
```

Si `git status` affiche « nothing to commit », tu n'as rien à sauver : passe à
la suite.

---

## 2. Demande l'accès en écriture

Avant de cloner, il faut que tu sois **collaborateur** du dépôt, sinon tu pourras
lire mais pas pousser.

Demande à Djraa de t'ajouter : `Settings` → `Collaborators` → `Add people` →
ton identifiant GitHub. Tu recevras une invitation par e-mail, **accepte-la**.

---

## 3. Clone le vrai dépôt

Mets l'ancien dossier de côté plutôt que de le supprimer tout de suite — on ne
jette rien tant que tout n'est pas vérifié.

```bash
cd ~/projets                       # ou là où tu ranges tes projets
mv novafriq novafriq-ancien-fork   # on garde, on ne supprime pas encore

git clone https://github.com/devdjraaa/novafriq.git
cd novafriq
npm install
npm run dev                        # vérifie que le site tourne chez toi
```

---

## 4. Vérifie que tu es bien sur le bon dépôt

```bash
git remote -v
```

Tu dois voir **`devdjraaa/novafriq`**. Si tu vois encore `Kaifree/novafriq`,
c'est que tu es resté dans l'ancien dossier.

---

## 5. Comment travailler à partir de maintenant

Ne pousse plus jamais directement sur `main` : le dépôt se **déploie tout seul en
production** à chaque push sur cette branche. Une erreur part en ligne
immédiatement.

Travaille sur une branche, pousse-la, et ouvre une pull request :

```bash
git checkout -b feat/ma-fonctionnalite
# ... tu codes ...
git add -A
git commit -m "feat: description courte de ce que tu as fait"
git push -u origin feat/ma-fonctionnalite
```

GitHub te proposera alors d'ouvrir la pull request. C'est le même geste
qu'avant, mais depuis le **même** dépôt : plus de divergence à rattraper.

Et avant chaque nouvelle branche, récupère ce que les autres ont poussé :

```bash
git checkout main
git pull
```

---

## 6. Quand tout est vérifié

Une fois que tu as travaillé une journée sans souci sur le nouveau dossier :

- supprime `novafriq-ancien-fork` de ta machine ;
- va sur `https://github.com/Kaifree/novafriq` → `Settings` → tout en bas →
  `Delete this repository`.

Supprimer le fork évite qu'on repousse dessus par habitude dans six mois.

---

## En cas de doute

Ne force rien — surtout pas `git push --force`. Écris à Djraa, on regarde
ensemble. Ton travail est déjà en sécurité sur `main`, il n'y a plus rien à
risquer.
