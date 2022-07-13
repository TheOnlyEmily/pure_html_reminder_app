class RemViewBuilder {
    constructor(buildList=[]) {
        this.buildList = buildList;
    }

    getBuildList() {
        return this.buildList.length > 0 ? this.buildList.map((x) => x) : [];
    }

    createNode(tag) {
        return this.pushNode(document.createElement(tag));
    }

    setNodeText(text) {
        const currentIndex = this.getCurrentNodeIndex();
        const newBuildList = this.getBuildList();
        newBuildList[currentIndex].innerHTML = text;
        return new RemViewBuilder(newBuildList);
    }

    pushNode(node) {
        const newBuildList = this.getBuildList();
        newBuildList.push(node);
        return new RemViewBuilder(newBuildList);
    }

    pushNodes(nodes) {
        const newBuildList = this.getBuildList();
        nodes.forEach((n) => newBuildList.push(n));
        return new RemViewBuilder(newBuildList);
    }

    setNodeRemData(data) {
        const currentIndex = this.getCurrentNodeIndex();
        const newBuildList = this.getBuildList();
        newBuildList[currentIndex].remData = data;
        return new RemViewBuilder(newBuildList);
    }

    setDispatchOnClick(event) {
        const currentIndex = this.getCurrentNodeIndex();
        const newBuildList = this.getBuildList();
        newBuildList[currentIndex].addEventListener("click", (e) => e.target.dispatchEvent(event));
        return new RemViewBuilder(newBuildList);
    }

    getCurrentNodeIndex() {
        return this.buildList.length - 1;
    }

    assemble() {
        const newBuildList = this.getBuildList();
        const root = newBuildList.shift();
        newBuildList.forEach((node) => root.appendChild(node));
        return new RemViewBuilder([root]);
    }

    popNode() {
        return this.getBuildList().pop();
    }
}

export {RemViewBuilder};