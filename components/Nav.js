/**
 * @jsx React.DOM
 */

var React = require('react');
var Menu = require('./Menu');
var Logo = require('./Logo');
var _ = require('lodash');
var Moment = require('moment');

var Nav = React.createClass({


    /**
     * @return {object}
     */
    render: function() {
        var items = [{
            text: 'Dashboard',
            key: 'dashboard',
            path: 'dashboard',
            icon: 'fa fa-dashboard'
        }, {
            text: 'Reports',
            key: 'reports',
            path: 'reports',
            icon: 'fa fa-bar-chart'
        }, {
            text: 'Logs',
            key: 'logs',
            path: 'logs',
            icon: 'fa fa-file'
        }, {
            text: 'Projects',
            key: 'projectManage',
            path: 'projectManage',
            icon: 'fa fa-rocket'
        }, {
            text: 'Tasks',
            key: 'projects',
            path: 'projects',
            icon: 'fa fa-tasks'
        }, {
            text: "Editor",
            key: "logEditor",
            path: "/logEditor/" + new Moment().format('YYYY-MM-DD'),
            icon: "fa fa-edit"
        }, {
            text: 'Affects',
            key: 'affects',
            path: "affects",
            icon: "fa fa-heartbeat"
        }, {
            text: 'Goals',
            key: 'goals',
            path: 'goals',
            icon: "fa fa-trophy"
        }];
        //var isActive = this.isActive(this.props.to, this.props.params, this.props.query);
        return (
            <nav className="ltt_c-nav">
                <Menu
                    items={items}
                    activeKey={this.props.initialMenuItem}
                    text={false} //only icon
                    onMenuClick={this.onMenuClick}
                />
            </nav>
        );
    },

    onMenuClick: function (menuItem) {
        if (_.isFunction(this.props.onMenuClick)) {
            this.props.onMenuClick(menuItem);
        };
    }

});

module.exports = Nav;
