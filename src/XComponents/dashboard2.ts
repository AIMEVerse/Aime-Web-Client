
import { XPell, XUtils, XData, XUI, XEventManager as XEM, XUIObject, XObjectPack } from 'xpell'






export class DashboardLeft extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-left",
            _html_tag: "aside",
            class: "dashboard-left"

        }
        super(data, defaults);

        let dashboardLeft = /* html */`
        <div _html_tag="aside">
            <div id="result"></div>
            <div class="top">
                <div class="logo">
                    <img src="/images/aime-logo.svg" alt="AIME logo"/>
                    <h2>AIME</h2>
                </div>
                <div class="close" id="close-btn">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">close</span>
                </div>
            </div>
            <div class="sidebar">
                <a href="#" class="active">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">person_outline</span>
                    <h2>Customers</h2>
                </a>
                <a href="#" class="">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">insights</span>
                    <h2>Analytics</h2>
                </a>
                <a href="#" class="">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">settings</span>
                    <h2>Settings</h2>
                </a>
                <a href="#" class="">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">logout</span>
                    <h2>Logout</h2>
                </a>
            </div>
        </div>`


        const sj = XPell.parser.xmlString2XPell(dashboardLeft);
        const sjObj = XUI.create(sj)
        this.append(sjObj)
    }

}

export class DashboardMain extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-main",
            _html_tag: "div",
            class: "dashboard-main"

        }
        super(data, defaults);

        let dashboardMain = /* html */`
        <div>
            <h2>AIME Dashboard</h2>

            <div class="date">
                <input type="date"/>
            </div>
  

            <div class="insights">
      
                <div class="sales">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">analytics</span>
                    <div class="middle">
                        <div class="left">
                            <h2>Online Users</h2>
                            <h2>37</h2>
                        </div>

                        <div class="progress">
                            <svg _html_tag="svg">
                                <circle  _html_tag="circle" cx="40" cy="40" r="36"></circle>
                            </svg>
                            <div class="number">
                                <p>74%</p>
                            </div>
                        </div> 

                    </div>
                    <small class="text-muted">Last 24 hours</small>
                </div>

                <div class="expenses">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">bar_chart</span>
                    <div class="middle">
                        <div class="left">
                            <h2>Total Expenses</h2>
                            <h2>$1,487</h2>
                        </div>

                        <div class="progress">

                            <div class="number">
                                <p>65%</p>
                            </div>
                        </div>

                    </div>
                    <small class="text-muted">Last 24 hours</small>
                </div>
  
                <div class="income">
                    <span _html_tag="span" class="material-icons material-symbols-sharp">stacked_line_chart</span>
                    <div class="middle">
                        <div class="left">
                            <h2>Total Income</h2>
                            <h2>$13,476</h2>
                        </div>

                        <div class="progress">

                            <div class="number">
                                <p>87%</p>
                            </div>
                        </div>

                    </div>
                    <small class="text-muted">Last 24 hours</small>
                </div>
            </div>
    

            <div class="recent-activities">
                <h2>Recent Activities</h2>
<table>
                    <thead>
                        <tr>
                            <th>User</th>
                            <th>Activity</th>
                            <th>Server</th>
                            <th>Parcel</th>
                            <th>Position</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jacob</td>
                            <td>Clicked on player</td>
                            <td>Atlas</td>
                            <td>13,4</td>
                            <td>14.6,2.2,16.81</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Jacob</td>
                            <td>Expression: Hand wave</td>
                            <td>Atlas</td>
                            <td>13,4</td>
                            <td>14.6,2.2,16.81</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Guest #5733</td>
                            <td class="danger">Disconnected</td>
                            <td>Atlas</td>
                            <td>4,17</td>
                            <td>14.6,2.2,16.81</td>
                            <td class="primary">Details</td>
                        </tr>
                        <tr>
                            <td>Olly02</td>
                            <td>Bought an item</td>
                            <td>Atlas</td>
                            <td>11,5</td>
                            <td>14.6,2.2,16.81</td>
                            <td class="primary">Details</td>
                        </tr>
                    </tbody>
                </table>
                <a href="#">Show All</a>
            </div>
        </div>`

        const sj = XPell.parser.xmlString2XPell(dashboardMain);
        const sjObj = XUI.create(sj)
        this.append(sjObj)
    }

}

export class DashboardRight extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-right",
            _html_tag: "div",
            class: "dashboard-right"

        }
        super(data, defaults);

    }

}

// export class DashboardLoader extends XUIObject {
//     constructor(data) {

//         const ids = XUtils.guid()
//         const defaults = {
//             _ids: ids,
//             _type: "dashboard-loader",
//             _html_tag: "div",
//             class: "dashboard-loader"

//         }
//         super(data, defaults);

//         const loaderContainer = XUI.create({ "_type": "view", "_id": "loaderContainer" + ids, "class": "loader-container" })
//         const aimeLoader = XUI.create({ "_type": "view", "_id": "aimeLoader" + ids, "class": "loader" })

//         loaderContainer.append(aimeLoader)

//     }

// }

export class DashboardPanel extends XUIObject {
    constructor(data) {

        const ids = XUtils.guid()
        const defaults = {
            _ids: ids,
            _type: "dashboard-panel",
            _html_tag: "div",
            class: "container",


        }
        super(data, defaults);


        const dashboardLeft = new DashboardLeft({ _id: "dashboard-left" })
        const dashboardMain = new DashboardMain({ _id: "dashboard-main" })
        // const aimeLoader = new DashboardLoader({ _id: "aime-dashboard-loader" })




        // const widgets = XUI.create({ "_type": "view", "_id": "widgets" + ids, "class": "widgets" })
        // const cardPack = new CardPack({ _id: "cp" })



        this.append(dashboardLeft)
        this.append(dashboardMain)
        // this.append(headerPanel)
        // this.append(dashboardBody)
        // dashboardBody.append(sidePanel)
        // dashboardBody.append(widgets)

        // aimeLoader.append(loaderContainer)

        // widgets.append(dashboardWidget)
        // dashboardWidget.append(cardPack)
        // dashboardWidget.append(userCard2)

    }

}


export class DashboardComponent extends XObjectPack {
    static getObjects() {
        return {
            "dashboard-panel": DashboardPanel,
            "dashboard-left": DashboardLeft,
            "dashboard-main": DashboardMain,
            "dashboard-right": DashboardRight,
            // "dashboard-loader": DashboardLoader
            // "card": UserCard,
            // "card-pack": CardPack
        }
    }
}


export default DashboardComponent