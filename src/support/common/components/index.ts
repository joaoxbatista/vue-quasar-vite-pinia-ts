import Vue from 'vue'
// procura os módulos que serão carregados dentro da pasta de componentes da aplicação
const components = import.meta.globEager('./*.vue')

// Carrega todos os componentes da aplicação
export const globalComponents = Object.entries(components)
  .map(([path, definition]) => {
    // Get name of component, based on filename
    let componentName = path.split('/').pop()
    if (componentName) {
      componentName = componentName.replace(/\.\w+$/, '')
      return {
        name: componentName,
        component: definition.default,
      }
    } else {
      return null
    }
  })
  .filter((obj): obj is { name: string; component: Vue.Component } => !!obj)
