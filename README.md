# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).
# appweb-trpr01

# Description du projet
Ce Travail représente une simulation d'une gestionnaire d'inventaire en ligne. Par exemple, il indique si un produit a 0 quantité en stock et permet d'ajouter des nouveaux produits et leurs détails.

# Utilisation de L'IA

J'ai utilisé l'IA à 3 reprise: 

1. Pour générer la liste de jeux de base de la liste ainsi que leur détails (L'IA a juste pas compris qu'il fallait une desc et le bool de si les details sont visible, alors c'est moi qui les as écris)
   (Fichier: VideoGameForm.vue // Ligne: 39 - 100)

2. Pour utiliser bootstrap pour le mobile. Exemple: dans le fichier App.vue, sur la ligne 85, j'ai écris le composant col-12 et p-3, mais l'ia a mis col-md-6. et ce ceci dans les trois fichier principale.

3. Pour comprendre pourquoi dans VideoGameList, Ligne 25 - 36, avant je n'avais pas { deep: true } et sa ne marchais pas alors j'ai demander pourquoi et voici ce que sa ma sortie. Il m'a expliquer que le deep : true fesais que maintenant, il ne fesais plus juste "Watcher" l'array de jeux et c'est valeur(Ex: est décencher uniquement si le length change ou le is empty est égale a vrai. Mais il va "Watcher" si les éléments À L'INTÉRIEUR de l'array change (EX: LA QUANTITÉ EN STOCK) ce qui me permet d'avoir une notification quand la quantité est changer à 0.

# URL pour le site déployer

https://ladsy8.github.io/appweb-trpr01/ (Aussi, juste dire que dans l'énnoncé c'est écris de l'appeller appweb-trpr02 "o	La bonne URL demandée est utilisée (appweb-trpr02)" alors que nous somme au TrPr01, alors voici pourquoi je l'ai appelé comme cela.)

# URL pour le repo

https://github.com/LADsy8/appweb-trpr01
