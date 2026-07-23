/**
 * Les ressources du back-office.
 *
 * TOUT ce fichier est de la déclaration : pas une ligne d'affichage. Chaque
 * entrée décrit ce qu'est le contenu — ses colonnes, ses champs, ses filtres —
 * et le composant Ressource en déduit la liste, le formulaire, la recherche,
 * le réordonnancement et la suppression.
 *
 * Ajouter un type de contenu au site = ajouter une entrée ici. C'est la
 * promesse de l'approche, et c'est vérifiable : il n'y a aucun écran par
 * ressource dans le dossier.
 */

const STATUTS_PRODUIT = [
  { valeur: 'en_ligne', libelle: 'En ligne', couleur: 'vert' },
  { valeur: 'a_venir', libelle: 'À venir', couleur: 'ambre' },
  { valeur: 'etude', libelle: "À l'étude", couleur: 'gris' },
]

const STATUTS_MESSAGE = [
  { valeur: 'nouveau', libelle: 'Nouveau', couleur: 'bleu' },
  { valeur: 'lu', libelle: 'Lu', couleur: 'gris' },
  { valeur: 'traite', libelle: 'Traité', couleur: 'vert' },
  { valeur: 'archive', libelle: 'Archivé', couleur: 'gris' },
  { valeur: 'indesirable', libelle: 'Indésirable', couleur: 'rouge' },
]

const STATUTS_ARTICLE = [
  { valeur: 'brouillon', libelle: 'Brouillon', couleur: 'ambre' },
  { valeur: 'publie', libelle: 'Publié', couleur: 'vert' },
]

const ACTIF = {
  nom: 'actif',
  libelle: 'Visible sur le site',
  type: 'booleen',
  defaut: true,
  pleine: true,
  aide: "Décoché, l'élément reste en base mais disparaît du site.",
}

/** Les huit listes illustrées partagent la même forme : une seule fabrique. */
function listeIllustree({ cle, titre, description, avecEtiquette, avecItems, etiquetteLibelle }) {
  return {
    cle: 'blocs',
    id: cle,
    parametres: { collection: cle },
    titre,
    description,
    champTitre: 'titre',
    reordonnable: true,
    libelleCreation: 'Ajouter un élément',
    vide: { titre: 'Liste vide', texte: 'Cette section du site n’affichera rien tant qu’aucun élément n’est ajouté.' },
    colonnes: [
      ...(avecEtiquette ? [{ champ: 'etiquette', libelle: etiquetteLibelle || 'Repère' }] : []),
      { champ: 'titre', libelle: 'Titre', principal: true },
      { champ: 'texte', libelle: 'Texte', coupe: true },
      { champ: 'actif', libelle: 'Visible', type: 'booleen' },
    ],
    champs: [
      { nom: 'collection', type: 'texte', libelle: 'Collection', defaut: cle, cache: true },
      ...(avecEtiquette
        ? [{ nom: 'etiquette', libelle: etiquetteLibelle || 'Repère', type: 'texte', indice: '2024', aide: 'Court : une année, un numéro d’étape.' }]
        : []),
      { nom: 'titre', libelle: 'Titre', type: 'texte', requis: true, pleine: !avecEtiquette },
      { nom: 'texte', libelle: 'Texte', type: 'texte_long', pleine: true, lignes: 3 },
      ...(avecItems
        ? [{ nom: 'donnees.items', libelle: 'Éléments listés', type: 'textes', pleine: true, indice: 'Ex. : Produits SaaS' }]
        : [{ nom: 'icone', libelle: 'Icône', type: 'icone', pleine: true }]),
      ACTIF,
    ],
  }
}

export const RESSOURCES = [
  {
    groupe: 'Contenu',
    entrees: [
      {
        cle: 'produits',
        titre: 'Produits',
        description: 'Les produits du groupe, en ligne ou annoncés.',
        reordonnable: true,
        libelleCreation: 'Ajouter un produit',
        vide: { titre: 'Aucun produit', texte: 'Le portefeuille est vide.' },
        colonnes: [
          { champ: 'image', libelle: '', type: 'image' },
          { champ: 'nom', libelle: 'Nom', principal: true },
          { champ: 'accroche', libelle: 'Accroche' },
          { champ: 'statut', libelle: 'Statut', type: 'etiquette', options: STATUTS_PRODUIT },
          { champ: 'vedette', libelle: 'Vedette', type: 'booleen' },
          { champ: 'actif', libelle: 'Visible', type: 'booleen' },
        ],
        filtres: [{ champ: 'statut', libelle: 'Tous les statuts', options: STATUTS_PRODUIT }],
        champs: [
          { nom: 'nom', libelle: 'Nom', type: 'texte', requis: true },
          { nom: 'accroche', libelle: 'Accroche', type: 'texte', indice: 'Mode & Artisanat numérique' },
          { nom: 'description', libelle: 'Description', type: 'texte_long', pleine: true },
          { nom: 'statut', libelle: 'Statut', type: 'liste', options: STATUTS_PRODUIT, requis: true, defaut: 'a_venir' },
          { nom: 'statut_libelle', libelle: 'Libellé du statut', type: 'texte', aide: 'Ce qui s’affiche sur la carte. Vide, le libellé standard est utilisé.' },
          { nom: 'lien', libelle: 'Lien', type: 'texte', html: 'url', indice: 'https://…' },
          { nom: 'lien_libelle', libelle: 'Texte du lien', type: 'texte', indice: 'Visiter Gextimo' },
          { type: 'section', libelle: 'Mise en avant' },
          { nom: 'image', libelle: 'Image', type: 'image', pleine: true },
          { nom: 'caracteristiques', libelle: 'Arguments', type: 'textes', pleine: true, indice: 'Boutique en ligne personnalisée…' },
          { nom: 'citation', libelle: 'Slogan', type: 'texte', pleine: true, indice: 'Créez, gérez, rayonnez.' },
          {
            nom: 'vedette',
            libelle: 'Produit mis en avant sur l’accueil',
            type: 'booleen',
            pleine: true,
            aide: 'Un seul produit à la fois : cocher ici décoche automatiquement le précédent.',
          },
          ACTIF,
        ],
      },

      {
        cle: 'membres',
        titre: 'Équipe',
        description: 'Les personnes présentées sur la page Équipe.',
        reordonnable: true,
        libelleCreation: 'Ajouter un membre',
        vide: { titre: 'Aucun membre', texte: 'La page Équipe n’affichera personne.' },
        colonnes: [
          { champ: 'photo', libelle: '', type: 'image' },
          { champ: 'nom', libelle: 'Nom', principal: true },
          { champ: 'poste', libelle: 'Poste' },
          { champ: 'badge', libelle: 'Badge' },
          { champ: 'actif', libelle: 'Visible', type: 'booleen' },
        ],
        champs: [
          { nom: 'nom', libelle: 'Nom', type: 'texte', requis: true },
          { nom: 'poste', libelle: 'Poste', type: 'texte' },
          { nom: 'badge', libelle: 'Badge', type: 'texte', indice: 'Co-Associé' },
          { nom: 'photo', libelle: 'Photo', type: 'image' },
          { nom: 'description', libelle: 'Description', type: 'texte_long', pleine: true, lignes: 3 },
          ACTIF,
        ],
      },

      {
        cle: 'postes',
        titre: 'Offres d’emploi',
        description: 'Les postes ouverts, affichés sur la page Carrières. Un poste pourvu se décoche ici.',
        reordonnable: true,
        champTitre: 'titre',
        libelleCreation: 'Ajouter une offre',
        vide: { titre: 'Aucune offre ouverte', texte: 'La page Carrières affichera le message prévu à cet effet.' },
        colonnes: [
          { champ: 'titre', libelle: 'Intitulé', principal: true },
          { champ: 'lieu', libelle: 'Lieu' },
          { champ: 'type_contrat', libelle: 'Contrat' },
          { champ: 'actif', libelle: 'Ouverte', type: 'booleen' },
        ],
        champs: [
          { nom: 'titre', libelle: 'Intitulé du poste', type: 'texte', requis: true, pleine: true },
          { nom: 'lieu', libelle: 'Lieu', type: 'texte', indice: 'Sèmè-Podji / Télétravail' },
          { nom: 'type_contrat', libelle: 'Type de contrat', type: 'texte', indice: 'Temps plein' },
          { nom: 'description', libelle: 'Description', type: 'texte_long', pleine: true, lignes: 6 },
          { ...ACTIF, libelle: 'Offre ouverte', aide: 'Décochée, l’offre disparaît de la page Carrières.' },
        ],
      },

      {
        cle: 'faqs',
        titre: 'Questions fréquentes',
        reordonnable: true,
        champTitre: 'question',
        libelleCreation: 'Ajouter une question',
        vide: { titre: 'Aucune question', texte: 'La page FAQ sera vide.' },
        colonnes: [
          { champ: 'question', libelle: 'Question', principal: true, coupe: true },
          { champ: 'reponse', libelle: 'Réponse', coupe: true },
          { champ: 'actif', libelle: 'Visible', type: 'booleen' },
        ],
        champs: [
          { nom: 'question', libelle: 'Question', type: 'texte', requis: true, pleine: true },
          { nom: 'reponse', libelle: 'Réponse', type: 'texte_long', requis: true, pleine: true, lignes: 5 },
          ACTIF,
        ],
      },

      {
        cle: 'partenaires',
        titre: 'Partenaires',
        description: 'Tant qu’aucun partenaire n’est saisi, la page affiche des emplacements réservés.',
        reordonnable: true,
        libelleCreation: 'Ajouter un partenaire',
        vide: { titre: 'Aucun partenaire', texte: 'La page affiche les emplacements réservés annoncés.' },
        colonnes: [
          { champ: 'logo', libelle: '', type: 'image' },
          { champ: 'nom', libelle: 'Nom', principal: true },
          { champ: 'lien', libelle: 'Lien' },
          { champ: 'actif', libelle: 'Visible', type: 'booleen' },
        ],
        champs: [
          { nom: 'nom', libelle: 'Nom', type: 'texte', requis: true },
          { nom: 'lien', libelle: 'Site web', type: 'texte', html: 'url', indice: 'https://…' },
          { nom: 'logo', libelle: 'Logo', type: 'image', pleine: true },
          ACTIF,
        ],
      },
    ],
  },

  {
    groupe: 'Blog',
    entrees: [
      {
        cle: 'articles',
        titre: 'Articles',
        description: 'Le blog annoncé sur la page Actualités.',
        champTitre: 'titre',
        libelleCreation: 'Écrire un article',
        tailleModale: 'xl',
        vide: { titre: 'Aucun article', texte: 'La page Actualités affichera le message prévu à cet effet.' },
        colonnes: [
          { champ: 'titre', libelle: 'Titre', principal: true, coupe: true },
          { champ: 'statut', libelle: 'Statut', type: 'etiquette', options: STATUTS_ARTICLE },
          { champ: 'publie_le', libelle: 'Parution', type: 'date' },
          { champ: 'vues', libelle: 'Lectures' },
        ],
        filtres: [{ champ: 'statut', libelle: 'Tous les statuts', options: STATUTS_ARTICLE }],
        champs: [
          { nom: 'titre', libelle: 'Titre', type: 'texte', requis: true, pleine: true },
          { nom: 'chapo', libelle: 'Chapô', type: 'texte_long', pleine: true, lignes: 2, aide: 'Le résumé affiché dans la liste des articles.' },
          { nom: 'contenu', libelle: 'Contenu', type: 'markdown', pleine: true, lignes: 16 },
          { type: 'section', libelle: 'Publication' },
          { nom: 'statut', libelle: 'Statut', type: 'liste', options: STATUTS_ARTICLE, requis: true, defaut: 'brouillon' },
          { nom: 'publie_le', libelle: 'Date de parution', type: 'date', aide: 'Une date future programme la parution. Vide en publiant, l’article paraît maintenant.' },
          { nom: 'couverture', libelle: 'Image de couverture', type: 'image', pleine: true },
          { type: 'section', libelle: 'Référencement' },
          { nom: 'seo_titre', libelle: 'Titre pour les moteurs', type: 'texte', pleine: true, aide: 'Vide, le titre de l’article est utilisé.' },
          { nom: 'seo_description', libelle: 'Description', type: 'texte_long', pleine: true, lignes: 2 },
        ],
      },

      {
        cle: 'categories-article',
        titre: 'Rubriques',
        reordonnable: true,
        libelleCreation: 'Ajouter une rubrique',
        vide: { titre: 'Aucune rubrique', texte: 'Les articles pourront tout de même être publiés.' },
        colonnes: [
          { champ: 'nom', libelle: 'Nom', principal: true },
          { champ: 'description', libelle: 'Description', coupe: true },
          { champ: 'actif', libelle: 'Visible', type: 'booleen' },
        ],
        champs: [
          { nom: 'nom', libelle: 'Nom', type: 'texte', requis: true, pleine: true },
          { nom: 'description', libelle: 'Description', type: 'texte_long', pleine: true, lignes: 2 },
          ACTIF,
        ],
      },
    ],
  },

  {
    groupe: 'Sections du site',
    entrees: [
      listeIllustree({ cle: 'piliers', titre: 'Piliers stratégiques', description: 'Les cinq domaines présentés sur l’accueil.' }),
      listeIllustree({ cle: 'pourquoi', titre: 'Pourquoi nous choisir', description: 'Les arguments de la section « Pourquoi NovafriQ ».' }),
      listeIllustree({ cle: 'engagements', titre: 'Engagements', description: 'La section « Ce en quoi nous croyons » de la page Vision.' }),
      listeIllustree({ cle: 'poles', titre: 'Pôles', description: 'Les cinq pôles, avec leur liste d’activités.', avecItems: true }),
      listeIllustree({ cle: 'services', titre: 'Services', description: 'Les prestations proposées aux organisations.' }),
      listeIllustree({ cle: 'feuille_route', titre: 'Feuille de route', description: 'La frise des grandes étapes.', avecEtiquette: true, etiquetteLibelle: 'Année' }),
      listeIllustree({ cle: 'methode', titre: 'Méthode', description: 'Les six étapes de la méthode de travail.', avecEtiquette: true, etiquetteLibelle: 'Étape' }),
      listeIllustree({ cle: 'reperes', titre: 'Repères du fondateur', description: 'Les deux encarts de la page Fondateur.' }),
    ],
  },

  {
    groupe: 'Administration',
    entrees: [
      {
        cle: 'messages',
        titre: 'Messages reçus',
        description: 'Les messages envoyés depuis le formulaire de contact du site.',
        lectureSeule: true,
        champTitre: 'email',
        pastille: 'messages_nouveaux',
        vide: { titre: 'Aucun message', texte: 'Les messages envoyés depuis le site apparaîtront ici.' },
        colonnes: [
          { champ: 'created_at', libelle: 'Reçu le', type: 'date' },
          { champ: 'email', libelle: 'Expéditeur', principal: true },
          { champ: 'objet', libelle: 'Objet' },
          { champ: 'statut', libelle: 'Statut', type: 'etiquette', options: STATUTS_MESSAGE },
        ],
        filtres: [{ champ: 'statut', libelle: 'Tous les statuts', options: STATUTS_MESSAGE }],
        titreEdition: (m) => `Message de ${[m.prenom, m.nom].filter(Boolean).join(' ') || m.email}`,
        // Le message reçu s'AFFICHE, il ne s'édite pas : seuls le statut et la
        // note interne se modifient. Pouvoir réécrire un message reçu lui
        // ferait perdre toute valeur de preuve.
        apercu: (m) => (
          <div className="adm-carte" style={{ padding: 16 }}>
            <p className="adm-aide">
              {m.email}{m.telephone ? ` · ${m.telephone}` : ''}
            </p>
            <p style={{ fontWeight: 600, margin: '8px 0 4px' }}>{m.objet || 'Sans objet'}</p>
            <p style={{ whiteSpace: 'pre-wrap' }}>{m.message}</p>
          </div>
        ),
        champs: [
          { nom: 'statut', libelle: 'Statut', type: 'liste', options: STATUTS_MESSAGE, requis: true, pleine: true },
          { nom: 'note_interne', libelle: 'Note interne', type: 'texte_long', pleine: true, lignes: 3, aide: 'Visible seulement ici. Jamais envoyée à l’expéditeur.' },
        ],
      },

      {
        cle: 'utilisateurs',
        titre: 'Comptes',
        description: 'Qui peut accéder à ce back-office.',
        reserveAdmin: true,
        libelleCreation: 'Ajouter un compte',
        vide: { titre: 'Aucun compte', texte: '' },
        colonnes: [
          { champ: 'nom', libelle: 'Nom', principal: true },
          { champ: 'email', libelle: 'E-mail' },
          {
            champ: 'role',
            libelle: 'Rôle',
            type: 'etiquette',
            options: [
              { valeur: 'admin', libelle: 'Administrateur', couleur: 'bleu' },
              { valeur: 'editeur', libelle: 'Éditeur', couleur: 'gris' },
            ],
          },
          { champ: 'actif', libelle: 'Actif', type: 'booleen' },
        ],
        champs: [
          { nom: 'nom', libelle: 'Nom', type: 'texte', requis: true },
          { nom: 'email', libelle: 'E-mail', type: 'texte', html: 'email', requis: true },
          {
            nom: 'role',
            libelle: 'Rôle',
            type: 'liste',
            requis: true,
            defaut: 'editeur',
            options: [
              { valeur: 'editeur', libelle: 'Éditeur — le contenu seulement' },
              { valeur: 'admin', libelle: 'Administrateur — tout, y compris les comptes' },
            ],
          },
          {
            nom: 'mot_de_passe',
            libelle: 'Mot de passe',
            type: 'texte',
            html: 'password',
            autocomplete: 'new-password',
            aide: 'Dix caractères minimum. Laissé vide sur un compte existant, le mot de passe actuel est conservé.',
          },
          { ...ACTIF, libelle: 'Compte actif', aide: 'Décoché, la personne ne peut plus se connecter.' },
        ],
      },
    ],
  },
]

/** Toutes les entrées à plat — pour le routage. */
export const TOUTES = RESSOURCES.flatMap((g) => g.entrees)

export const trouverRessource = (id) => TOUTES.find((r) => (r.id || r.cle) === id)
