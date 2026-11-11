import { Controls, Server, type Symbol, TcHmiControl } from 'Beckhoff.TwinCAT.HMI.Framework/index.esm.js';
import { PermissionCheckbox } from './PermissionCheckbox.js';
export declare enum Resource {
    SYMBOL = 0,
    FILE = 1
}
declare class TcHmiPermissionManagement extends TcHmiControl.Control {
    #private;
    constructor(element: JQuery, pcElement: JQuery, attrs: Controls.ControlAttributeList);
    /** Reference to the root dom element of the current control template as jquery object. */
    protected __elementTemplateRoot: HTMLElement;
    private __table;
    private __tableHead;
    private __tableBody;
    private __grid;
    /**
     * State a permission was last labelled for. Every value which arrives sweeps every group of every
     * symbol, and the texts of a row which did not change do not have to be built again.
     */
    private readonly __labelledState;
    /** State a mapping limit was last shown for, see [[__labelledState]]. */
    private readonly __indicatedState;
    private __filter;
    private __regExForFilter;
    private __resourceSearch;
    private __shownResourceList;
    private __matchingResources;
    private __messageNoResourcesFound;
    private __messageWriteFailed;
    private __messageFileListFailed;
    /**
     * Outcome of the last listing of the files which reached the table: null while every folder was read,
     * incomplete while a folder below the root failed and failed while the root itself failed.
     */
    private __fileListFailure;
    private __openInfo;
    private __checkboxElements;
    private __resource;
    /** Value of the attribute ResourceType, it decides [[__resource]]. */
    private __resourceType;
    /** Counts the listings of the files, the answer of an outdated listing is dropped. */
    private __fileListSession;
    /**
     * Entries with an ACCESS of the TcHmiSrv.Config::FILES value they were built from, see [[__fileLimitEntries]].
     * The limit of every file of every row is resolved on every update, so they are only built again when that
     * value was replaced.
     */
    private __fileLimitCache;
    /**
     * Rules of a user group as entries, by the FILES object of the group they were built from. The access of every
     * file of every row is resolved on every update, see [[__resolveFileGroupAccess]].
     */
    private readonly __groupFileRuleCache;
    /**
     * Subscription of the resources of the current type: ListSymbols for symbols, the limits of the files for
     * files. It is exchanged when the resource type changes while the control is attached.
     */
    private __resourceSubscription;
    /**
     * True while a host handed the resources over via setResources. Only a control which was not fed that way
     * reads the symbols of the server itself, see __attach.
     */
    private __externalResource;
    private __resourceView;
    private __showHiddenSymbols;
    private __viewToggle;
    private __hiddenSymbolsToggle;
    private __resizeBar;
    private __storage;
    /**
     * Names of the nodes which the user collapsed. Every value which arrives rebuilds the rows, so the
     * collapsed nodes have to survive that.
     */
    private readonly __collapsedResources;
    /** Every row the current view would show, in the order they are shown. */
    private __allRows;
    /** The rows which the filter, the search and the collapsed nodes leave over, in the order shown. */
    private __visibleRows;
    /** Model a rendered row stands for, the handlers of the row ask it for the symbol they write. */
    private readonly __rowModel;
    /** Permissions of a rendered row, a rebind sets their state and registers them again. */
    private readonly __rowParts;
    /** Rows which left the window, by the kind of row they were built for. */
    private readonly __freeRows;
    /** Rows which exist in the dom right now, by the name of the symbol they stand for. */
    private readonly __renderedRows;
    /** First and one past the last visible row which the dom holds. */
    private __renderedWindow;
    /** Height of a row, it has to agree with .permission-row in Style.css. */
    private static readonly __rowHeight;
    /** Rows which are rendered beyond the visible ones, so a scroll does not show a gap. */
    private static readonly __rowOverscan;
    /** Read and write checkbox of the default access of a user group, per group. */
    private readonly __defaultAccessCheckboxes;
    /** Checkboxes of a node of the hierarchy with the symbols they answer for, per group. */
    private readonly __subtreeCheckboxElements;
    /**
     * Symbols and user groups the rows were built from. An update which brings the same ones only changed
     * values, and then the checkboxes are renewed instead of the whole table.
     */
    private __renderedFrom;
    private __renderedUserGroups;
    private readonly __symbolDefaultLimits;
    private readonly __readOnlySymbols;
    private readonly __symbolAccessIndicators;
    private readonly __subtreeSymbolAccessIndicators;
    private __allSymbolAccessCheckboxes;
    private __canWriteSymbolAccess;
    private __symbolAccessSession;
    private readonly __pendingSymbolAccess;
    private __hoveredPermission;
    private __focusedPermission;
    private readonly __permissionContextCells;
    private __writeFailure;
    /** Reader of the language which arrived last, the texts are read from it, see [[__text]]. */
    private __localizationReader;
    /** What differs between symbols and files, see [[__descriptor]]. */
    private static readonly __descriptors;
    /** Keys, separator and texts of the resource type which is shown. */
    private get __descriptor();
    /**
     * Text of a key of the symbols in the variant of the resource type which is shown. Empty until the
     * language arrived, a reader answers an unknown key with the key itself.
     */
    private __text;
    /**
     * Horizontal step per level of the hierarchy in pixels. The arrow of a node hangs into it, so it pairs with
     * the negative margin of .arrow in Style.css.
     */
    private static readonly __indentStep;
    private static readonly __icons;
    protected __subscriptionsToUnsubscribeOnDetach: (number | null)[];
    /**
     * Hands the resources of the current resource type over, a symbol list for symbols or a file list keyed by
     * the full server path for files. Null gives the reading back to the control: an attached control lists the
     * files again right away, the symbols are read from the next attach on, see __attach.
     */
    setResources(resourceList: SymbolList | FileList | null): void;
    /**
     * If raised, the control object exists in control cache and constructor of each inheritation level was called.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __previnit(): void;
    /** Names the resize bar after the column of the resource type which is shown. */
    private __updateResizeBarLabel;
    /** Renews every text which depends on the language or on the resource type. */
    private __updateResourceTexts;
    /** Opens native dismissible help next to the button that requested it. */
    private __onInfoClick;
    /** Keeps help near its visible anchor, flipping above it and clamping to the viewport as needed. */
    private __positionInfoPopup;
    /**
     * Renders the rows the scroll uncovered and marks a table which is scrolled away from its top, the
     * header casts a shadow while it is.
     */
    protected __elemScrollHandling(): void;
    /** Keeps keyboard context stable while the pointer moves across other permissions. */
    private __onPermissionContext;
    /** Traces an inherited permission to its group default and mapping limit without changing values. */
    private __updatePermissionContext;
    /** Reports the width of the sticky name column, the resize bar names it to assistive technology. */
    private __syncNameColumnMetrics;
    /** Width the name column has right now, dragged or automatic. */
    private __nameColumnWidth;
    /** Allows resizing the name pane without a pointing device. */
    private __onResizeBarKeyDown;
    private __initialized;
    /** Flattens the resources into one row per symbol, a node of the hierarchy carries its subtree. */
    private __buildRowModels;
    /**
     * Which rows are shown and which of them are results of their own. A row below a collapsed node is not
     * shown, but it still counts as a result: collapsing hides rows, it does not narrow the selection.
     */
    private __updateVisibleRows;
    /**
     * Renders the rows which are on screen. Rows which stay are left alone, so a scroll builds a row per
     * row it uncovers instead of the whole table.
     */
    private __renderRowWindow;
    /** Gives up the elements of a row which left the window, together with what pointed at them. */
    private __releaseRow;
    /**
     * Rows of one kind are built alike, so one of them can stand for another symbol of that kind. A node
     * carries the permissions of its subtree and a row of a path has no access of its own.
     */
    private static rowKind;
    /** Binds a row which was built for another symbol to the one it stands for now. */
    private __bindRow;
    /** Drops every row of the body, a new list of symbols or of groups needs new rows. */
    private __releaseAllRows;
    /**
     * Names of the resources which the filter and the search term match, together with the names of every row
     * which is shown for them. In the hierarchical view the nodes of the path of a match are shown as well, so
     * a hit is never left without the path it belongs to.
     */
    private __resolveMatchingResources;
    protected __updateSymbolSearch(): void;
    /** Marks the part of a name which the search term matches, the term stays on the row it was used for. */
    private __highlightName;
    /** Everything which follows from the rows which are shown: the count, the bulk row and the labels. */
    private __finishSymbolSearch;
    /** Aggregates explicit and inherited group rules over a parent or the complete matching selection. */
    private __updateGroupAggregate;
    /** Names the scope of the bulk operation using the current filter. */
    private __updateBulkLabel;
    /**
     * Names a number of resources in one text. The count sits in a placeholder because a language which
     * puts it elsewhere cannot be served by three pieces in a fixed order.
     */
    private __namedScope;
    /** Whether every symbol addressed by a write checkbox is read-only. */
    private __isReadOnlySelection;
    /** Explains inheritance without using the denied-access symbol for an explicit permission. */
    private __updateInheritanceLabels;
    /** Names the configured read/write bits for explanatory tooltips. */
    private __formatAccess;
    /** Displays a confirmed mapping-default bit. */
    private __setSymbolIndicator;
    /** Updates the visible mapping limits when ListSymbols or the language changes. */
    private __updateSymbolIndicators;
    /** Limits a parent action to its currently matching symbols, including collapsed children. */
    private __matchingSubtreeSymbols;
    /** Shows the mapping bits shared by all matching symbols, independently of group defaults. */
    private __updateAllSymbolAccess;
    /** Updates the mapping controls of a parent or of the all-symbol row. */
    private __updateAggregateSymbolAccess;
    /** Enables mapping edits only for a confirmed configuration write permission in this attachment. */
    private __updateSymbolAccessPermission;
    /** Writes a mapping bit for one or more symbols and applies only confirmed permissions. */
    private __writeSymbolAccess;
    /**
     * If raised, all attributes have been set to it's default or dom values.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __init(): void;
    /** Applies the view the user chose for the resource type which is shown, the files keep their own one. */
    private __restoreResourceView;
    /**
     * Applies the width the user dragged for the name column, null gives it back to the automatic one.
     * The width lives in a css variable, so it replaces the cap of the column instead of fighting it.
     */
    private __applyNameColumnWidth;
    /** Drags the width of the name column, the minimum of the column is enforced by the styles. */
    /** Ends a drag which is still running, a control which goes away must not leave the cursor behind. */
    private __endResizeDrag;
    private __onResizeBarPointerDown;
    /** Gives the name column back to its automatic width. */
    private __onResizeBarDoubleClick;
    /**
     * Keeps the scroll position over a rebuild of the rows. Every value which arrives renews the rows, and
     * a table which jumps back to its top on every write cannot be worked with.
     */
    private __keepScrollPosition;
    /**
     * Numbers the cells of a row, a grid does not tell that to assistive technology on its own. The rows of
     * the body number themselves while they are rendered, only the rows of the head are counted here.
     */
    private __indexRows;
    /**
     * Lists the files below a folder into a flat list keyed by their full path, e.g. /Content/Page.content.
     * A folder is no resource of its own, only the files below it are listed. The callback runs once every
     * folder answered, a listing which is no longer current stops descending. The folders which could not be
     * listed are collected in pendingOperations.failed, the files which were read are listed nevertheless.
     */
    protected __fetchRecursiveFiles(path: string, storage: FileList, finalCallback: () => void, pendingOperations?: {
        count: number;
        failed: string[];
    }, isCurrent?: () => boolean): void;
    /**
     * Reads all files of the server once, Filter restricts them like the symbols. The list is not part of the
     * subscription of the user groups, a listing of the whole tree on every tick would cost a request per folder.
     */
    private __loadFiles;
    protected __recordToMap<K extends string | number, V>(record: Record<K, V>): Map<K, V>;
    private __cached_results;
    protected __subscriptionCallback(data: Server.IResultObject): void;
    private __removePreviousGenericElements;
    private __createGroupHeader;
    private __createGroupDefaultAccessElements;
    protected __allSymbolsChangeCallback(groupName: string, checkboxRead: PermissionCheckbox, checkboxWrite: PermissionCheckbox, targetCheckbox: PermissionCheckbox, symbolNames?: readonly string[]): void;
    protected __createGroupAllResourcesElements(groupName: string, groupElements: any, rowGroupAllSymbols: HTMLElement): void;
    protected __onInheritCheckboxChange(groupName: string, resourceList: string[], notCheckedFn: (...args: any[]) => any, inheritCheckbox: PermissionCheckbox): void;
    protected __removeAccessFromResources(groupName: string, resourceList: string[], checkboxes?: PermissionCheckbox[]): void;
    /**
     * Builds the one row a model stands for. Only the rows of the window exist, so this runs for a handful
     * of rows on a scroll instead of for every symbol of the server.
     */
    private __createResourceRow;
    /** Builds the table for the resources of the current type, symbols or files, and the given user groups. */
    __updateTableSymbols(symbolList: SymbolList | FileList, userGroups: Record<string, any>): void;
    /** Creates the label naming the source of the group's permissions. */
    private static createSourceIndicator;
    /** Updates the label without duplicating the read and write columns. */
    private updateSourceIndicator;
    /**
     * Cell of the grid. The table was built of table elements before, which could not carry two scrolling
     * areas and sized its columns by an algorithm of its own, see the grid in Style.css.
     */
    private static createCell;
    /** Row of the grid, it lays its cells out on the columns of the table with a subgrid. */
    private static createRow;
    /**
     * Lays the columns of the grid out: the name, the own access of a symbol and three per user group.
     * A table sized its columns on its own, a grid has to be told.
     */
    private __applyColumns;
    /** Names the rows were built from, two equal ones mean that only values changed. */
    private static buildRenderSignature;
    /**
     * Renews the checkboxes from the values which arrived, without building a single row again. Returns
     * false while the rows do not fit the update, then the caller has to build them.
     */
    private __applyAccessInPlace;
    /** Keeps the mapping limits available for leaf and subtree permission calculations. */
    private __updateSymbolLimits;
    /** Matches the server's Usergroup::access: an explicit entry overrides the limited default. */
    private __resolveGroupAccess;
    /**
     * Matches the server's File::match_path_prefix and the precedence of Usergroup::file_access and
     * match_file_permission: an entry applies to every path it is a prefix of, the longest entry wins and on equal
     * length an exact case match beats a differently cased one. Differently cased entries of equal length are
     * ambiguous and restrict each other. A case insensitive match assumes a server on Windows, which resolves file
     * names that way. Returns null while no entry applies.
     */
    private static matchFilePrefix;
    /**
     * Limit of a file, the ACCESS of the entry of TcHmiSrv.Config::FILES which matches it best, see
     * matchFilePrefix. The server allows everything for a file without such an entry. FILESREGEX is not taken
     * into account, it is no part of what this control edits. Source names an entry of a folder the limit
     * comes from, it is null for an entry of the file itself or no entry.
     */
    private __resolveFileLimit;
    /**
     * Entries of TcHmiSrv.Config::FILES which carry an ACCESS. Every write of that value replaces it, the
     * subscription and a confirmed change of the File access, so a different value invalidates the cache.
     */
    private __fileLimitEntries;
    /**
     * Access of a user group to a file like Usergroup::file_access of the server: the best matching entry of the
     * rules of the group wins, see matchFilePrefix, otherwise the group default restricted by the limit of the
     * file. Source names the entry of a folder the rule comes from, it is null for an own rule of the file or the
     * group default. The control never writes such a rule of a folder.
     */
    private __resolveFileGroupAccess;
    /** Rules of the FILES of a user group as entries, built once per FILES object, see [[__groupFileRuleCache]]. */
    private __groupFileRules;
    /**
     * Folder whose rule a file with an own rule takes once that own rule is gone, see __resolveFileGroupAccess.
     * Null while no rule of a folder applies to it, then the group default does.
     */
    private __folderRuleBehindOwn;
    /**
     * True while File access is shown but the TcHmiSrv.Config::FILES value it comes from did not arrive. Every
     * file looks like one without an entry then, and a write of a whole entry would drop its other members.
     */
    private __isFileLimitPending;
    /**
     * Refuses a rule of a user group for files while their limits are pending, see __isFileLimitPending. The
     * group default of a file is shown unmasked then, and an explicit rule written from it wins over the limit
     * for good. Shows the confirmed values again and ends the loading of the given checkboxes.
     */
    private __refuseGroupWrite;
    /**
     * Folder whose rule every one of the files takes, see __resolveFileGroupAccess. Null for no files or while
     * one of them has no such rule or takes it from a different folder.
     */
    private __sharedFolderSource;
    /** Refreshes existing cells from confirmed group values. */
    private __refreshAccess;
    /** An access which the symbols of a subtree do not agree on leaves its checkbox unset. */
    private static applyTriState;
    static getAccessValue(read_access: boolean, write_access: boolean): Server.ACCESS;
    static hasReadAccess(accessValue: Server.ACCESS): boolean;
    static hasWriteAccess(accessValue: Server.ACCESS): boolean;
    /**
     * Names of the symbols at and below the given node. A node which only carries a segment of a path is no
     * symbol of the server and contributes none of its own.
     */
    static collectSubtreeSymbols(name: string, entry: SymbolListEntry, into?: string[]): string[];
    /**
     * Read and write access which the symbols of a subtree have for one user group. A value is null while
     * the symbols do not agree on it, which the checkbox of the node shows as an unset one.
     */
    private __resolveSubtreeAccess;
    /**
     * Writes one permission per symbol in one request. A write which stands for more than one symbol runs
     * as a transaction: a permission set for a part of the symbols is worse than one which was refused,
     * because nobody can tell from the table which part it reached.
     */
    private __writeGroupAccess;
    /**
     * Ends the loading animation of the checkboxes of a write and reports what could not be written. A
     * checkbox waits for the answer of its own write, it must not spin until the subscription ticks.
     */
    private __finishWrite;
    /** Applies confirmed writes atomically without mutating subscribed data or rebuilding rows. */
    private __completeAccessWrite;
    /** Reports the permissions of a subtree which could not be written, none of them hides the message. */
    private __reportWriteFailures;
    /** Translates the current failure without logging it again when the language changes. */
    private __updateWriteFailureMessage;
    /** Names a listing of the files which could not read every folder, see [[__fileListFailure]]. */
    private __updateFileListMessage;
    /**
     * Is called by the system after the control instance gets part of the current DOM.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __attach(): void;
    /**
     * Starts reading the resources of the current type: the symbols by a subscription, the files once together
     * with a subscription of their limits. The resources of a host which handed them over are not read, the
     * limits of files are, because a host only hands the files over.
     */
    private __subscribeResources;
    /**
     * Is called by the system after the control instance is no longer part of the current DOM.
     * This function is only to be used by the System. Other function calls are not intended.
     */
    __detach(): void;
    /**
     * Destroy the current control instance.
     * Will be called automatically if system destroys control!
     */
    destroy(): void;
    /**
     * Sets the value of the member variable "device" if the new value is not equal to the current value
     * @param valueNew The new value for device.
     */
    setFilter(valueNew: string | null): void;
    getFilter(): string;
    /**
     * How the resources are arranged, as a flat list or grouped by the segments of their names. The user
     * switches it with the button in the header of the name column, it is no attribute of the control.
     */
    setResourceView(valueNew: ResourceView | null): void;
    getResourceView(): ResourceView | undefined;
    /** Switches between the two views and keeps the one which is shown for the next visit. */
    private __toggleResourceView;
    /**
     * Which resources the permissions are managed for, the symbols or the files of the server. A host which
     * handed resources over hands over the ones of the new type as well, until then the control reads them.
     */
    setResourceType(valueNew: ResourceType | null): void;
    getResourceType(): ResourceType | undefined;
    /** Shows the current view while the tooltip names the switching action. */
    private __updateViewToggle;
    /** Updates the hidden-symbol toggle's action hint and current state. */
    private __updateHiddenSymbolsToggle;
    /** Builds the rows again from the data which is cached, e.g. after the view was switched. */
    private __rebuildTable;
    /** Renders a noninteractive example without populating the server data cache. */
    private __showDesignerPlaceholder;
    /**
     * Groups a flat symbol list by the segments of the symbol names. Every node keeps the full name as its
     * key, because that is what a permission is written for, only the label of the row shows the segment.
     * A node of a path which is no symbol of the server itself is marked as synthetic and gets no
     * permissions, while a symbol which has children keeps its own. Files are grouped by the folders of
     * their paths with the separator '/', a folder is always such a synthetic node.
     */
    static buildSymbolTree(symbolList: SymbolList, separator?: string): SymbolList;
    /**
     * Full names of the nodes along a name, the name itself last. A leading separator of a file path stays
     * part of every node, so /Content/Page.content yields /Content and /Content/Page.content.
     */
    private static pathsOf;
    /**
     * Sets the value of the member variable "device" if the new value is not equal to the current value
     * @param valueNew The new value for device.
     */
    setRegExForFilter(valueNew: boolean | null): void;
    getRegExForFilter(): boolean | undefined;
    static Resource: typeof Resource;
}
/**
 * One row of the table as data. The table renders a window of these, so everything which asks what the
 * table shows asks the models and not the dom.
 */
export interface PermissionRowModel {
    /** Full name of the symbol or the file the row stands for. */
    name: string;
    /** What the name cell shows, the segment of the path in the hierarchical view. */
    label: string;
    /** Depth in the hierarchy, it indents the name. */
    level: number;
    /** A row which only carries a segment of a path and is no symbol of the server itself. */
    synthetic: boolean;
    /** The schema of the symbol forbids writing it. */
    readOnly: boolean;
    /** Access the mapping allows for the symbol. */
    access: Server.ACCESS;
    /** Symbols below the row, its permissions answer for all of them. Null for a leaf. */
    subtree: string[] | null;
}
export type GroupName = string;
export type SymbolName = string;
export type ResourceList = SymbolList;
export type ResourceListEntry<T = ResourceList> = {
    ACCESS: number | undefined;
    SCHEMA?: {
        readOnly?: boolean;
    };
    CONTENT?: T;
};
export type SymbolList = Map<string, SymbolListEntry>;
export type SymbolListEntry = Symbol.IListSymbols & {
    CONTENT?: SymbolList;
    /** True for a node which only groups the symbols of a path and is no symbol of the server itself. */
    SYNTHETIC?: boolean;
};
/** Files keyed by their full server path with a leading slash, e.g. /Content/Page.content. */
export type FileList = Map<string, FileListEntry>;
export type FileListEntry = {
    /** Access of the current user as ListFiles reports it, the limit of a file comes from the configuration. */
    ACCESS?: number;
    CONTENT?: FileList;
    /** True for a folder of the hierarchy, a folder is no resource of its own. */
    SYNTHETIC?: boolean;
};
/** Entry of TcHmiSrv.Config::FILES, only ACCESS is edited here, the other members are kept. */
export type FileSettings = {
    ACCESS?: number | null;
    [key: string]: unknown;
};
/** Value of the attribute ResourceType. */
export type ResourceType = 'Symbols' | 'Files';
/** Whether the resources are listed by their full name or grouped by the segments of it. */
export type ResourceView = 'List' | 'Hierarchical';
export interface ServerFile {
    fileFlags: ('Directory' | 'ReadOnly' | 'UserAccessReadOnly' | 'VirtualDirectory')[];
    fileSize?: number;
    link?: string;
    access?: Server.ACCESS;
    /** The md5 hash of the file */
    hash?: string;
    modificationTime?: string;
}
export { TcHmiPermissionManagement as Control };
declare const _TcHmiPermissionManagement: typeof TcHmiPermissionManagement;
type tTcHmiPermissionManagement = TcHmiPermissionManagement;
type tResource = Resource;
type tSymbolName = SymbolName;
type tGroupName = GroupName;
type tResourceList = ResourceList;
type tResourceListEntry = ResourceListEntry;
type tSymbolList = SymbolList;
type tSymbolListEntry = SymbolListEntry;
type tServerFile = ServerFile;
type tFileList = FileList;
type tFileListEntry = FileListEntry;
type tFileSettings = FileSettings;
type tResourceType = ResourceType;
declare global {
    namespace TcHmi.Controls.Beckhoff {
        const TcHmiPermissionManagement: typeof _TcHmiPermissionManagement;
        type TcHmiPermissionManagement = tTcHmiPermissionManagement;
        namespace TcHmiPermissionManagement {
            type Resource = tResource;
            type GroupName = tGroupName;
            type SymbolName = tSymbolName;
            type ResourceList = tResourceList;
            type ResourceListEntry = tResourceListEntry;
            type SymbolList = tSymbolList;
            type SymbolListEntry = tSymbolListEntry;
            type ServerFile = tServerFile;
            type FileList = tFileList;
            type FileListEntry = tFileListEntry;
            type FileSettings = tFileSettings;
            type ResourceType = tResourceType;
        }
    }
}
//# sourceMappingURL=TcHmiPermissionManagement.esm.d.ts.map